import * as CSS from "csstype";
import { css, cx } from "@emotion/css";
import { atMediaUp, BreakpointConfig } from "../../breakpoints";
import { spaceSizes, SpaceSize } from "../modifiers/modifierUtils";

type ResponsiveValues = BreakpointConfig<number | string | undefined>;
type CSSPropertyKeys = keyof CSS.PropertiesHyphen;

const parseResponsiveStyle = (
  property: CSSPropertyKeys,
  value?: ResponsiveValues
) => {
  if (value === undefined || value === "" || value === null) {
    return;
  }

  if (typeof value === "object") {
    return cx(
      Object.keys(value).reduce((acc, breakpoint) => {
        acc.push(
          css`
            ${atMediaUp[breakpoint](css`
              ${property}: ${value[breakpoint]};
            `)};
          `
        );
        return acc;
      }, Array())
    );
  }
  return css`
    ${property}: ${value};
  `;
};

export const getResponsiveStyleData = (
  key: CSSPropertyKeys,
  value: ResponsiveValues = "",
  map?: object
) => {
  let val = value;
  if (map) {
    if (typeof value !== "object" && map) {
      val = map[value];
    } else {
      val = Object.keys(value).reduce((acc, breakpoint) => {
        acc[breakpoint] = map ? map[value[breakpoint]] : value[breakpoint];
        return acc;
      }, {});
    }
  }

  return { key, val };
};

export const getResponsiveStyle = (
  property: CSSPropertyKeys,
  value: ResponsiveValues = "",
  map?: object
) => {
  const { key, val } = getResponsiveStyleData(property, value, map);
  return parseResponsiveStyle(key, val);
};

export const getResponsiveSpacingStyle = (
  property: CSSPropertyKeys,
  spaceSize: SpaceSize = "none"
) => getResponsiveStyle(property, spaceSize, spaceSizes);
