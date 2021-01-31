import * as React from "react";
import { css } from "@emotion/css";
import {
  atMediaUp,
  BreakpointConfig
} from "../../../../shared/styles/breakpoints";
import { getResponsiveStyle } from "../../../../shared/styles/styleUtils";
import { flexItem } from "../../../../shared/styles/styleUtils/layout/flexbox";

type FlexStrategy = "shrink" | "grow";

interface FlexItemProps {
  className?: string;
  /**
   * Whether the flex item should grow or shrinkwrap to it's children. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  flex?: BreakpointConfig<FlexStrategy>;
  /**
   * The rate at which a flex item should grow. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  growFactor?: BreakpointConfig<React.CSSProperties["flexGrow"]>;
  /**
   * The position at which a flex item should be visually rendered. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  order?: BreakpointConfig<React.CSSProperties["order"]>;
  /**
   * Which HTML tag to render the component with
   */
  tag?: keyof React.ReactHTML;
}

const getResponsiveFlexItemStyles = flexVal =>
  typeof flexVal !== "object"
    ? flexItem(flexVal)
    : Object.keys(flexVal).map(breakpoint =>
        atMediaUp[breakpoint](flexItem(flexVal[breakpoint]))
      );

const FlexItem: React.FC<FlexItemProps> = ({
  children,
  className,
  flex,
  growFactor,
  order,
  tag = "div"
}) => {
  const FlexItemEl = tag;

  return (
    <FlexItemEl
      className={css`
        ${getResponsiveFlexItemStyles(flex)};
        ${getResponsiveStyle("flex-grow", growFactor)};
        ${getResponsiveStyle("order", order)};
        ${className};
      `}
      data-cy="flexItem"
    >
      {children}
    </FlexItemEl>
  );
};

FlexItem.defaultProps = {
  flex: "grow"
};

export default FlexItem;
