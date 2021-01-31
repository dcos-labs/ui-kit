import * as React from "react";
import { css } from "@emotion/css";
import { gridColumnTemplate } from "../style";
import { SpaceSize } from "../../../../shared/styles/styleUtils/modifiers/modifierUtils";
import {
  listReset,
  getResponsiveSpacingStyle
} from "../../../../shared/styles/styleUtils";
import { BreakpointConfig } from "../../../../shared/styles/breakpoints";

interface GridListProps {
  /**
   * How many columns the grid should be. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  columnCount: BreakpointConfig<number>;
  /**
   * The size of the space between each list item. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  gutterSize?: SpaceSize;
  /**
   * Which HTML list tag to render the component with
   */
  tag: "ul" | "ol";
  children:
    | Array<React.ReactElement<HTMLLIElement>>
    | React.ReactElement<HTMLLIElement>;
}

const GridList = (props: GridListProps) => {
  const { children, columnCount, gutterSize, tag } = props;
  const GridListEl = tag;

  return (
    <GridListEl
      className={css`
        display: grid;
        ${getResponsiveSpacingStyle("grid-gap", gutterSize)};
        ${gridColumnTemplate(columnCount)};
        ${listReset};
      `}
      data-cy="gridList"
    >
      {children}
    </GridListEl>
  );
};

GridList.defaultProps = {
  gutterSize: "m",
  tag: "ul"
};

export default GridList;
