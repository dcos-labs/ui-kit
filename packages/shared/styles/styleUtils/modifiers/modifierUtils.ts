import { css } from "@emotion/css";
import * as CSS from "csstype";
import {
  spaceXxs,
  spaceXs,
  spaceS,
  spaceM,
  spaceL,
  spaceXl,
  spaceXxl
} from "../../../../design-tokens/build/js/designTokens";
import { getResponsiveSpacingStyle } from "../layout/handleResponsiveStyle";
import { BreakpointConfig } from "../../breakpoints";

type CSSPropertyKeys = keyof CSS.PropertiesHyphen;
export type BoxSides =
  | "all"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "horiz"
  | "vert";
export type SpaceSizes = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "none";
export type SpaceSize = BreakpointConfig<SpaceSizes>;

export const spaceSizes = {
  xxs: spaceXxs,
  xs: spaceXs,
  s: spaceS,
  m: spaceM,
  l: spaceL,
  xl: spaceXl,
  xxl: spaceXxl,
  none: 0
};

export const boxSpacing = (
  property: "margin" | "padding",
  side: BoxSides,
  spaceSize: SpaceSize = "m"
) => {
  switch (side) {
    case "all":
      return getResponsiveSpacingStyle(property, spaceSize);
    case "horiz":
      return css`
        ${getResponsiveSpacingStyle(
          `${property}-left` as CSSPropertyKeys,
          spaceSize
        )};
        ${getResponsiveSpacingStyle(
          `${property}-right` as CSSPropertyKeys,
          spaceSize
        )};
      `;
    case "vert":
      return css`
        ${getResponsiveSpacingStyle(
          `${property}-top` as CSSPropertyKeys,
          spaceSize
        )};
        ${getResponsiveSpacingStyle(
          `${property}-bottom` as CSSPropertyKeys,
          spaceSize
        )};
      `;
    case undefined:
      return;
    default:
      return css`
        ${getResponsiveSpacingStyle(
          `${property}-${side}` as CSSPropertyKeys,
          spaceSize
        )};
      `;
  }
};
