import * as React from "react";
import { css } from "@emotion/css";
import { SpaceSize } from "../../../../shared/styles/styleUtils/modifiers/modifierUtils";
import {
  FlexboxProperties,
  flex,
  applyFlexItemGutters
} from "../../../../shared/styles/styleUtils/layout/flexbox";

interface FlexProps extends FlexboxProperties {
  className?: string;
  /**
   * The size of the space between each `FlexItem` child. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  gutterSize?: SpaceSize;
  /**
   * Which HTML tag to render the component with
   */
  tag?: keyof React.ReactHTML;
}

const Flex: React.FC<FlexProps> = ({
  children,
  className,
  gutterSize,
  tag = "div",
  ...flexboxProperties
}) => {
  const FlexEl = tag;

  return (
    <FlexEl
      className={css`
        ${flex({ ...flexboxProperties })};
        ${applyFlexItemGutters(flexboxProperties.direction, gutterSize)};
        ${className};
      `}
      data-cy="flex"
    >
      {children}
    </FlexEl>
  );
};

Flex.defaultProps = {
  align: "flex-start",
  direction: "row",
  wrap: "nowrap",
  justify: "flex-start",
  gutterSize: "none"
};

export default Flex;
