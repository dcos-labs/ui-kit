import * as React from "react";
import { cx } from "@emotion/css";
import { default as HeaderCell } from "./HeaderCell";
import Clickable from "../../clickable/components/clickable";
import { sortableHeaderIconBaseCSS, styleArrowDirection } from "../style";
import { HeaderCellProps } from "./HeaderCell";

type SortDirection = "ASC" | "DESC" | null;
export interface SortableHeaderCellProps
  extends Omit<HeaderCellProps, "children"> {
  sortHandler: () => void;
  sortDirection: SortDirection;
  columnContent: React.ReactNode;
}
interface SortableHeaderCellState {
  hovered: boolean;
}

export class SortableHeaderCell extends React.Component<
  SortableHeaderCellProps,
  SortableHeaderCellState
> {
  constructor(props: SortableHeaderCellProps) {
    super(props);

    this.hoverStart = this.hoverStart.bind(this);
    this.hoverEnd = this.hoverEnd.bind(this);
    this.state = {
      hovered: false
    };
  }

  hoverStart() {
    this.setState({ hovered: true });
  }

  hoverEnd() {
    this.setState({ hovered: false });
  }

  render() {
    const {
      sortHandler,
      sortDirection,
      columnContent,
      textAlign,
      capitalize,
      tooltipContent,
      tooltipId
    } = this.props;

    const displaySortDirection =
      sortDirection === null && this.state.hovered ? "DESC" : sortDirection;

    const ariaSortString = !displaySortDirection
      ? "none"
      : displaySortDirection === "DESC"
      ? "descending"
      : "ascending";

    return (
      <Clickable tabIndex={0} action={sortHandler} disableFocusOutline={true}>
        <HeaderCell
          onMouseEnter={this.hoverStart}
          onMouseLeave={this.hoverEnd}
          onFocus={this.hoverStart}
          onBlur={this.hoverEnd}
          className={cx(
            sortableHeaderIconBaseCSS,
            styleArrowDirection(displaySortDirection)
          )}
          role="columnheader"
          aria-sort={ariaSortString}
          aria-label={`sort by ${columnContent} in ${
            ariaSortString === "descending" ? "ascending" : "descending"
          } order`}
          textAlign={textAlign}
          capitalize={capitalize}
          tooltipContent={tooltipContent}
          tooltipId={tooltipId}
        >
          <span>{columnContent}</span>
        </HeaderCell>
      </Clickable>
    );
  }
}

export default SortableHeaderCell;
