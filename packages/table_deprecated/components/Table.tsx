import * as React from "react";
import Draggable from "react-draggable";
import { cx, css } from "@emotion/css";
import memoizeOne from "memoize-one";
import styled from "@emotion/styled";
import {
  AutoSizer,
  MultiGrid,
  GridCellProps,
  GridCellRangeProps,
  GridProps,
  defaultCellRangeRenderer
} from "react-virtualized";

import {
  headerCss,
  resizingHeader,
  cellCss,
  tableCss,
  rightGrid,
  topLeftGrid,
  hideScrollbarCss,
  rowHoverStyles,
  scrollbarMeas,
  dragHandle,
  unsetContainerOverflow,
  dragHandleWrapper,
  headerHover,
  draggableContainer,
  preventSortOverlap
} from "../style";

import { ColumnProps, Column } from "./Column";
import {
  vAlignChildren,
  flex,
  flexItem,
  padding
} from "../../shared/styles/styleUtils";
import {
  textColorSecondary,
  themeTextColorSecondary
} from "../../design-tokens/build/js/designTokens";
import { Icon } from "../../icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import SortableHeaderCell, {
  SortableHeaderCellProps
} from "./SortableHeaderCell";
import { CellProps } from "./Cell";
import { iconSizes } from "../../shared/styles/styleUtils/layout/iconSizes";

export interface TableProps {
  /**
   * Contains all data represented in the table.
   */
  data: any[];
  /**
   * Has to be either an Array of Columns or one Column.
   */
  children:
    | Array<React.ReactElement<ColumnProps>>
    | React.ReactElement<ColumnProps>;
  /**
   * How many columns do not scroll
   */
  fixedColumnCount?: number;
  /**
   * Set the row height
   */
  rowHeight?: number;
}

export interface TableState {
  isScrolling: boolean;
  hoveredRowIndex: number;
  resizedColWidths: Map<string, number>;
  resizeIndex: number;
}

export const ROW_HEIGHT = 35;
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;
const COL_RESIZE_MIN_WIDTH = 80;
const COL_RESIZE_MAX_WIDTH = 0.8; // max proportion of table container width
const RESIZE_ICON_SIZE = "xxs";

let colSizeCache: number[] = [];

export const clampWidth = (
  baseWidth: number,
  minWidth: number,
  maxWidth: number
): number => Math.min(Math.max(baseWidth, minWidth), maxWidth);

export const fillColumns = (
  columns: Array<React.ReactElement<ColumnProps>>,
  colWidths: number[],
  width: number
): number[] => {
  const copiedColWidths = [...colWidths];
  const filledArea = columns
    .filter(child => !child.props.growToFill)
    .map(col => copiedColWidths[columns.indexOf(col)])
    .reduce((acc, curr) => acc + curr, 0);
  const widthToFill = width - filledArea;
  const fillWidthColsIdxArr: number[] = columns
    .filter(child => child.props.growToFill)
    .map(col => columns.indexOf(col));

  fillWidthColsIdxArr.forEach(colIdx => {
    const oldWidth = copiedColWidths[colIdx];
    const newWidth = widthToFill / fillWidthColsIdxArr.length;

    if (newWidth <= oldWidth) {
      return;
    }

    copiedColWidths[colIdx] = clampWidth(
      newWidth,
      columns[colIdx].props.minWidth || 0,
      columns[colIdx].props.maxWidth || width
    );
  });

  if (copiedColWidths.reduce((acc, curr) => acc + curr, 0) < width) {
    const widthToRedistribute =
      width - copiedColWidths.reduce((acc, curr) => acc + curr, 0);
    const colsToRedistributeTo = columns.filter(
      col => col.props.growToFill && !col.props.maxWidth
    );

    return columns.map((col, i) => {
      if (col.props.growToFill && !col.props.maxWidth) {
        return (
          widthToRedistribute / colsToRedistributeTo.length + copiedColWidths[i]
        );
      }
      return copiedColWidths[i];
    });
  }
  return copiedColWidths;
};

const ContentCell = styled("div")`
  ${props => {
    return `${
      props.theme.coloredRows &&
      props.theme.coloredRows[props["data-rowindex"] - 1]
        ? rowHoverStyles
        : ""
    }
  ${
    props.theme.mutedRows && props.theme.mutedRows[props["data-rowindex"] - 1]
      ? `color: ${themeTextColorSecondary};`
      : ""
  }`;
  }};
`;

export class Table<T> extends React.PureComponent<TableProps, TableState> {
  public multiGridRef: {
    recomputeGridSize?: any;
    props?: { width: number };
    _bottomRightGrid?: React.ReactElement<GridProps>;
    _topRightGrid?: React.ReactElement<GridProps>;
  } = {};
  public scrollMeasRef = React.createRef<HTMLDivElement>();

  public getData = memoizeOne((data: T[]): Array<{}> | T[] => [{}, ...data]);

  public getColumnSizes = memoizeOne(
    (
      children: Array<React.ReactElement<ColumnProps>>,
      width: number
    ): number[] => {
      let remainingWidth: number = width;
      let scrollbarWidth: number = 0;
      const scrollbarMeasEl = this.scrollMeasRef.current;
      if (scrollbarMeasEl) {
        scrollbarWidth =
          scrollbarMeasEl.offsetWidth - scrollbarMeasEl.clientWidth;
      }
      const scrollbarAdjustedWidth = width - scrollbarWidth;
      const hasFillingColumns = children.filter(child => child.props.growToFill)
        .length;
      const { resizedColWidths } = this.state;

      const totalColumns: number = children.length;
      const colWidths = children.map((child, currentIndex) => {
        const calculatedWidth = child.props.width
          ? child.props.width({
              width,
              totalColumns,
              currentIndex,
              remainingWidth
            })
          : Math.floor(scrollbarAdjustedWidth / totalColumns);

        const clampedWidth = clampWidth(
          calculatedWidth,
          child.props.minWidth || 0,
          child.props.maxWidth || width
        );
        remainingWidth -= clampedWidth;
        return resizedColWidths.get(currentIndex.toString()) || clampedWidth;
      });

      const colSizeCacheVals = colSizeCache.map(
        (colSize, i) => resizedColWidths.get(i.toString()) || colSize
      );

      const valsToSet =
        hasFillingColumns && colSizeCache.length ? colSizeCacheVals : colWidths;

      if (hasFillingColumns && !resizedColWidths.size) {
        colSizeCache =
          fillColumns(children, colWidths, scrollbarAdjustedWidth) || [];
        return fillColumns(children, colWidths, scrollbarAdjustedWidth) || [];
      }

      colSizeCache = valsToSet;

      return valsToSet.map((val, i) => {
        return resizedColWidths.get(i.toString())
          ? Math.min(val, this.getContainerWidth() * COL_RESIZE_MAX_WIDTH)
          : val;
      });
    }
  );

  constructor(props) {
    super(props);

    this.getCell = this.getCell.bind(this);
    this.setRef = this.setRef.bind(this);
    this.updateGridSize = this.updateGridSize.bind(this);
    this.getGrid = this.getGrid.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.cellRenderer = this.cellRenderer.bind(this);
    this.cellRangeRenderer = this.cellRangeRenderer.bind(this);
    this.getContainerWidth = this.getContainerWidth.bind(this);
    this.getColumnWidth = this.getColumnWidth.bind(this);
    this.resizeColumn = this.resizeColumn.bind(this);

    this.state = {
      isScrolling: false,
      hoveredRowIndex: -1,
      resizedColWidths: new Map(),
      resizeIndex: -1
    };
  }

  componentDidUpdate(prevProps, nextState) {
    const { resizedColWidths } = this.state;
    const currColumns = React.Children.toArray(this.props.children) as Array<
      React.ReactElement<ColumnProps>
    >;
    const prevColumns = React.Children.toArray(prevProps.children) as Array<
      React.ReactElement<ColumnProps>
    >;

    if (
      resizedColWidths !== nextState.resizedColWidths ||
      currColumns.length !== prevColumns.length
    ) {
      this.updateGridSize();
    }
  }

  public render() {
    return (
      <React.Fragment>
        <AutoSizer
          __dataThatTriggersARerenderWhenChanged={this.props.data} // passed to notify react-virtualized about updates
          className={tableCss}
          defaultWidth={DEFAULT_WIDTH}
          defaultHeight={DEFAULT_HEIGHT}
          onResize={this.updateGridSize}
        >
          {({ height, width }) =>
            this.getGrid({ height, width }, this.state.isScrolling)
          }
        </AutoSizer>
        {/*
          Used to get scrollbar width to
          accurately calculate column widths
        */}
        <div className={scrollbarMeas} ref={this.scrollMeasRef} />
      </React.Fragment>
    );
  }

  public getContainerWidth() {
    return this.multiGridRef.props
      ? this.multiGridRef.props.width
      : DEFAULT_WIDTH;
  }

  public getColumnWidth(index: string, width: number) {
    const { resizedColWidths } = this.state;

    const columnSizes = this.getColumnSizes(
      React.Children.toArray(this.props.children) as Array<
        React.ReactElement<ColumnProps>
      >,
      width
    );

    return resizedColWidths.get(index.toString()) || columnSizes[index];
  }

  public resizeColumn(args: { dragDelta: number; index: string }) {
    const { resizedColWidths } = this.state;
    const { dragDelta, index } = args;
    const columns = React.Children.toArray(this.props.children) as Array<
      React.ReactElement<ColumnProps>
    >;

    let columnWidth = this.getColumnWidth(index, this.getContainerWidth());
    columnWidth = columnWidth + dragDelta;

    const newResizedColWidths = new Map(resizedColWidths);
    this.setState(
      {
        resizedColWidths: newResizedColWidths.set(index, columnWidth)
      },
      () => {
        if (columns[index].props.onResize) {
          columns[index].props.onResize(this.state.resizedColWidths.get(index));
        }
      }
    );
  }

  private onScroll({ scrollLeft }) {
    const scrollValue = Math.floor(scrollLeft);

    if (scrollValue >= 5 && !this.state.isScrolling) {
      this.setState({ isScrolling: true });
    }

    if (scrollValue < 5 && this.state.isScrolling) {
      this.setState({ isScrolling: false });
    }
  }

  private getGrid({ width, height }, isScrolling) {
    const rightGridStyles = isScrolling ? rightGrid : "";
    const columnCount = React.Children.count(this.props.children);
    const columnSizes = this.getColumnSizes(
      React.Children.toArray(this.props.children) as Array<
        React.ReactElement<ColumnProps>
      >,
      width
    );

    function getColumnSize({ index }) {
      return columnSizes[index];
    }

    return (
      <MultiGrid
        onScroll={this.onScroll}
        ref={this.setRef}
        fixedColumnCount={this.props.fixedColumnCount || 1}
        fixedRowCount={1}
        cellRangeRenderer={this.cellRangeRenderer}
        cellRenderer={this.cellRenderer}
        columnWidth={getColumnSize}
        columnCount={columnCount}
        enableFixedColumnScroll={true}
        enableFixedRowScroll={true}
        height={height}
        rowHeight={this.props.rowHeight || ROW_HEIGHT}
        rowCount={this.props.data.length + 1}
        width={width}
        hideTopRightGridScrollbar={true}
        hideBottomLeftGridScrollbar={true}
        classNameTopRightGrid={cx(
          rightGridStyles,
          hideScrollbarCss,
          unsetContainerOverflow
        )}
        classNameTopLeftGrid={cx(topLeftGrid, unsetContainerOverflow)}
        classNameBottomRightGrid={cx(rightGridStyles, unsetContainerOverflow)}
        classNameBottomLeftGrid={hideScrollbarCss}
      />
    );
  }

  private cellNeedsPreventIconOverlap(header, column) {
    const sortableHeaderCell = SortableHeaderCell as React.ComponentClass<
      SortableHeaderCellProps
    >;
    if (header && header.props && column.props) {
      return (
        (header.props.tooltipContent || header.type === sortableHeaderCell) &&
        column.props.resizable
      );
    }
    return false;
  }

  private getHeaderCell(
    args: GridCellProps & {
      column: React.ReactElement<ColumnProps>;
    }
  ) {
    const { key, style, column, columnIndex, rowIndex } = args;
    const header = column.props.header as React.ReactElement<
      CellProps | SortableHeaderCellProps
    >;

    const onStopCallback = (_, data) => {
      this.resizeColumn({
        dragDelta: data.x,
        index: columnIndex.toString()
      });
      this.setState({ resizeIndex: -1 });
    };
    const onStartCallback = () => {
      this.setState({ resizeIndex: columnIndex });
    };
    const dataCy = [
      "table-headerCell",
      `table-headerCell.col${columnIndex}`,
      `table-headerCell.row${rowIndex}`
    ].join(" ");

    return (
      <div
        className={cx(headerCss, vAlignChildren, {
          [resizingHeader]: this.state.resizeIndex >= 0,
          [headerHover]:
            this.state.resizeIndex === -1 ||
            this.state.resizeIndex === columnIndex
        })}
        style={style}
        key={key}
        data-cy={dataCy}
      >
        <div className={flex()}>
          <div
            className={cx(flexItem("grow"), {
              [preventSortOverlap(
                parseInt(iconSizes[RESIZE_ICON_SIZE], 10)
              )]: this.cellNeedsPreventIconOverlap(header, column)
            })}
          >
            {column.props.header}
          </div>
          <div className={cx(flexItem("shrink"), draggableContainer)}>
            {column.props.resizable && (
              <Draggable
                axis="x"
                defaultClassName={dragHandle}
                onStop={onStopCallback}
                position={{
                  x: 0,
                  y: 0
                }}
                onStart={onStartCallback}
                bounds={{
                  top: 0,
                  left: colSizeCache[columnIndex] * -1 + COL_RESIZE_MIN_WIDTH,
                  right:
                    this.getContainerWidth() -
                    colSizeCache[columnIndex] -
                    this.getContainerWidth() * (1 - COL_RESIZE_MAX_WIDTH),
                  bottom: 0
                }}
                // Needed for an issue where text inputs lose focus when a Draggable unmounts
                // Github issue: https://github.com/mzabriskie/react-draggable/issues/315
                enableUserSelectHack={false}
              >
                <div>
                  <div
                    className={cx(
                      dragHandleWrapper,
                      vAlignChildren,
                      padding("left", "l"),
                      "staticClass_dragHandleWrapper"
                    )}
                  >
                    <Icon
                      shape={SystemIcons.ResizeHorizontal}
                      size={RESIZE_ICON_SIZE}
                      color={textColorSecondary}
                    />
                  </div>
                </div>
              </Draggable>
            )}
          </div>
        </div>
      </div>
    );
  }

  private cellRangeRenderer(args: GridCellRangeProps) {
    const children = defaultCellRangeRenderer(args);
    const {
      rowStartIndex,
      rowStopIndex,
      rowSizeAndPositionManager,
      parent
    } = args;

    const takenWidth = colSizeCache.reduce((acc, curr) => acc + curr, 0);
    const fillerColSize = this.getContainerWidth() - takenWidth;

    for (let rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
      const rowDatum = rowSizeAndPositionManager.getSizeAndPositionOfCell(
        rowIndex
      );

      if (
        takenWidth < this.getContainerWidth() &&
        (parent === this.multiGridRef._bottomRightGrid ||
          parent === this.multiGridRef._topRightGrid)
      ) {
        children.push(
          <div
            style={{
              height: rowDatum.size,
              position: "absolute",
              right: fillerColSize * -1,
              top: rowDatum.offset,
              width: fillerColSize
            }}
            key={`filler-${rowIndex}`}
            className={cx(cellCss, vAlignChildren, {
              [css`
                ${rowHoverStyles};
              `]:
                rowIndex === this.state.hoveredRowIndex - 1 &&
                parent !== this.multiGridRef._topRightGrid,
              [headerCss]: parent === this.multiGridRef._topRightGrid
            })}
          />
        );
      }
    }

    return children;
  }

  private cellRenderer(args: GridCellProps) {
    return this.getCell(args);
  }

  private getCell(args: GridCellProps) {
    const { columnIndex, rowIndex } = args;
    const data = this.getData(this.props.data);

    const column = React.Children.toArray(this.props.children)[
      columnIndex
    ] as React.ReactElement<ColumnProps>;

    if (!column || column.type !== Column) {
      return null;
    }

    return rowIndex === 0
      ? this.getHeaderCell({ ...args, column })
      : this.getContentCell({ ...args, column, data });
  }

  private getContentCell(
    args: GridCellProps & {
      column: React.ReactElement<ColumnProps>;
      data: any[];
    }
  ) {
    const { style, key, column, data, rowIndex, columnIndex } = args;
    const updateHoveredRowIndex = () => {
      this.setState({ hoveredRowIndex: rowIndex });
    };
    const header = column.props.header as React.ReactElement<
      CellProps | SortableHeaderCellProps
    >;
    const dataCy = [
      "table-contentCell",
      `table-contentCell.col${columnIndex}`,
      `table-contentCell.row${rowIndex}`,
      ...(rowIndex === this.state.hoveredRowIndex
        ? ["table-contentCell.hoveredRow"]
        : [])
    ].join(" ");

    return (
      /* tslint:disable:react-a11y-event-has-role */
      <ContentCell
        className={cx(cellCss, vAlignChildren, {
          [css`
            ${rowHoverStyles};
          `]: rowIndex === this.state.hoveredRowIndex,
          [preventSortOverlap(
            parseInt(iconSizes[RESIZE_ICON_SIZE], 10)
          )]: this.cellNeedsPreventIconOverlap(header, column)
        })}
        style={style}
        key={key}
        onMouseOver={updateHoveredRowIndex}
        data-rowindex={rowIndex}
        data-cy={dataCy}
      >
        {column.props.cellRenderer(data[rowIndex], style.width as number)}
      </ContentCell>
      /* tslint:enable:react-a11y-event-has-role */
    );
  }

  private updateGridSize() {
    if (this.multiGridRef.recomputeGridSize != null) {
      this.multiGridRef.recomputeGridSize();
    }
  }

  private setRef(ref: any) {
    this.multiGridRef = ref;
  }
}

export default Table;
