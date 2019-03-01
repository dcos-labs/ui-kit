import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import {
  AutoSizer,
  MultiGrid,
  GridCellProps,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";

import {
  headerCss,
  cellCss,
  tableCss,
  rightGrid,
  hideScrollbarCss,
  rowHoverCss
} from "../style";

import { ColumnProps, Column } from "./Column";
import memoizeOne from "memoize-one";
import { vAlignChildren } from "../../shared/styles/styleUtils";

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
   * Selected row data
   */
  selectedRows?: object[];
  /**
   * Set the row height
   */
  rowHeight?: number;
}

export interface TableState {
  isScrolling: boolean;
  hoveredRowIndex: number;
}

const ROW_HEIGHT = 35;

const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;

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
  let copiedColWidths = [...colWidths];
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
      } else {
        return copiedColWidths[i];
      }
    });
  } else {
    return copiedColWidths;
  }
};

export class Table<T> extends React.PureComponent<TableProps, TableState> {
  public multiGridRef: { recomputeGridSize?: any } = {};

  public getData = memoizeOne(
    (data: T[]): Array<{}> | T[] => {
      return [{}, ...data];
    }
  );

  public getColumnSizes = memoizeOne(
    (
      children: Array<React.ReactElement<ColumnProps>>,
      width: number
    ): number[] => {
      let remainingWidth: number = width;

      const totalColumns: number = children.length;
      const colWidths = children.map((child, currentIndex) => {
        const calculatedWidth = child.props.width
          ? child.props.width({
              width,
              totalColumns,
              currentIndex,
              remainingWidth
            })
          : this.cellMeasureCache.columnWidth({ index: currentIndex }) + 1;
        // Adding 1 pixel to the calculated columnWidth for when we use `text-overflow: ellipsis`.
        // In rare cases, the browser will try and truncate the text too soon

        const clampedWidth = clampWidth(
          calculatedWidth,
          child.props.minWidth || 0,
          child.props.maxWidth || width
        );
        remainingWidth -= clampedWidth;
        return clampedWidth;
      });

      if (children.filter(child => child.props.growToFill).length) {
        return fillColumns(children, colWidths, width) || [];
      }

      return colWidths;
    }
  );

  private cellMeasureCache = new CellMeasurerCache({
    defaultHeight: this.props.rowHeight || ROW_HEIGHT,
    defaultWidth: 150,
    fixedHeight: true
  });

  constructor(props) {
    super(props);

    this.getCell = this.getCell.bind(this);
    this.setRef = this.setRef.bind(this);
    this.updateGridSize = this.updateGridSize.bind(this);
    this.getGrid = this.getGrid.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.cellRenderer = this.cellRenderer.bind(this);

    this.state = {
      isScrolling: false,
      hoveredRowIndex: -1
    };
  }

  public componentDidUpdate(prevProps: TableProps) {
    if (
      this.props.children !== prevProps.children ||
      this.props.data !== prevProps.data
    ) {
      this.cellMeasureCache.clearAll();
      this.updateGridSize();
    }
  }

  public render() {
    return (
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
        classNameTopRightGrid={cx(rightGridStyles, hideScrollbarCss)}
        classNameBottomRightGrid={rightGridStyles}
        classNameBottomLeftGrid={hideScrollbarCss}
      />
    );
  }

  private getHeaderCell(
    args: GridCellProps & {
      column: React.ReactElement<ColumnProps>;
    }
  ) {
    const { key, style, column } = args;
    return (
      <div className={cx(headerCss, vAlignChildren)} style={style} key={key}>
        {column.props.header}
      </div>
    );
  }

  private cellRenderer(args: GridCellProps) {
    const { columnIndex, rowIndex, key, parent } = args;

    return (
      <CellMeasurer
        cache={this.cellMeasureCache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        {this.getCell(args)}
      </CellMeasurer>
    );
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
    const { style, key, column, data, rowIndex } = args;
    const updateHoveredRowIndex = () => {
      this.setState({ hoveredRowIndex: rowIndex });
    };
    const selectedRows = this.props.selectedRows || [];

    return (
      /* tslint:disable:react-a11y-event-has-role */
      <div
        className={cx(cellCss, vAlignChildren, {
          [rowHoverCss]:
            rowIndex === this.state.hoveredRowIndex ||
            selectedRows.includes(data[rowIndex])
        })}
        style={style}
        key={key}
        onMouseOver={updateHoveredRowIndex}
      >
        {column.props.cellRenderer(data[rowIndex], style.width as number)}
      </div>
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
