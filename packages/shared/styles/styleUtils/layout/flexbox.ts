import { css } from "@emotion/css";
import { getResponsiveStyle } from "../";
import { BreakpointConfig } from "../../breakpoints";
import { getResponsiveSpacingStyle } from "./handleResponsiveStyle";

export interface FlexboxProperties {
  /**
   * The alignment of the `FlexItem` children. Refers to vertical alignment when `direction` is "row", and refers to horizontal alignment when `direction` is "column". Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  align?: BreakpointConfig<React.CSSProperties["alignItems"]>;
  /**
   * The justification of the `FlexItem` children. Refers to horizontal justification when `direction` is "row", and refers to vertical justification when `direction` is "column". Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  justify?: BreakpointConfig<React.CSSProperties["justifyContent"]>;
  /**
   * The direction the `FlexItem` children are laid out in. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  direction?: BreakpointConfig<React.CSSProperties["flexDirection"]>;
  /**
   * How `FlexItem` children should handle wrapping. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  wrap?: BreakpointConfig<React.CSSProperties["flexWrap"]>;
}

const flexStrategies = {
  grow: css`
    flex-basis: 0;
    flex-grow: 1;
    min-width: 0;
    width: auto;
  `,
  shrink: css`
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
    width: initial;
  `
};

const getResponsiveColumnStyles = (
  direction: BreakpointConfig<React.CSSProperties["flexDirection"]>,
  valueForColumnDirection: any,
  valueForOtherDirections: any = null
) => {
  const isColumn = direction === "column" || direction === "column-reverse";

  if (isColumn) {
    return valueForColumnDirection;
  }
  if (direction && typeof direction === "object") {
    return Object.entries(direction).reduce((acc, [breakpoint, config]) => {
      acc[breakpoint] = config.includes("column")
        ? valueForColumnDirection
        : valueForOtherDirections;

      return acc;
    }, {});
  }
  return valueForOtherDirections;
};

const getGutterPaddingValues = (responsivePaddingConfig, gutterSize) => {
  const paddingValues = {};

  // filter the responsivePaddingConfig to only have properties
  // where we need to remove the padding
  const breakpointsToRemovePadding = spacingSize =>
    Object.keys(spacingSize).reduce((acc, breakpoint) => {
      if (spacingSize[breakpoint] === "none") {
        acc[breakpoint] = spacingSize[breakpoint];
      }
      return acc;
    }, {});

  // override gutter values that need to be set to "none"
  const overideGutters = spacingSize => ({
    ...gutterSize,
    ...breakpointsToRemovePadding(spacingSize)
  });

  // remove any properties for breakpoints that did not have a responsive `direction` prop
  Object.keys(responsivePaddingConfig).forEach(
    key =>
      (paddingValues[key] = (key in overideGutters(responsivePaddingConfig)
        ? overideGutters(responsivePaddingConfig)
        : responsivePaddingConfig)[key])
  );

  return paddingValues;
};

export const flex = (
  flexProps: FlexboxProperties = {
    align: "flex",
    direction: "row",
    wrap: "nowrap",
    justify: "flex-start"
  }
) => {
  const { align, direction, wrap, justify } = flexProps;

  const childWidth = getResponsiveColumnStyles(direction, "100%", "auto");
  const height = getResponsiveColumnStyles(direction, "100%", "auto");

  // Note: the `min-height: 0` rule handles an issue with
  // flex containers that have `overflow: {auto|hidden|scroll}`
  // in Firefox and IE11
  return css`
    ${getResponsiveStyle("align-items", align)};
    ${getResponsiveStyle("height", height)};
    ${getResponsiveStyle("flex-direction", direction)};
    ${getResponsiveStyle("flex-wrap", wrap)};
    ${getResponsiveStyle("justify-content", justify)};
    box-sizing: border-box;
    display: flex;
    min-height: 0;

    > div {
      ${getResponsiveStyle("width", childWidth)};
    }
  `;
};

export const flexItem = (flexStrategy: "grow" | "shrink") =>
  css`
    box-sizing: border-box;
    ${flexStrategies[flexStrategy]};
  `;

export const applyFlexItemGutters = (direction, gutterSize) => {
  if (!Boolean(gutterSize)) {
    return;
  }

  const rowGuttter = getResponsiveColumnStyles(direction, gutterSize, "none");
  const columnGutter = getResponsiveColumnStyles(direction, "none", gutterSize);
  const rowGap =
    typeof rowGuttter === "object"
      ? getGutterPaddingValues(rowGuttter, gutterSize)
      : rowGuttter;
  const columnGap =
    typeof columnGutter === "object"
      ? getGutterPaddingValues(columnGutter, gutterSize)
      : columnGutter;

  return css`
    ${getResponsiveSpacingStyle("column-gap", columnGap)};
    ${getResponsiveSpacingStyle("row-gap", rowGap)};

    @supports (column-gap: 1px) and (row-gap: 1px) {
      > *:not(:last-child) {
        ${getResponsiveSpacingStyle("padding-right", columnGap)};
        ${getResponsiveSpacingStyle("padding-bottom", rowGap)};
      }
    }
  `;
};
