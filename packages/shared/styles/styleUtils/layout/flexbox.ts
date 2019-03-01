import { css } from "@emotion/core";

interface FlexboxProperties {
  align?: "flex" | "center" | "flex-start" | "flex-end" | "space-between";
  justify?: "flex" | "center" | "flex-start" | "flex-end" | "space-between";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  wrap?: "wrap" | "nowrap";
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

// Note: the `min-height: 0` rule handles an issue with
// flex containers that have `overflow: {auto|hidden|scroll}`
// in Firefox and IE11
export const flex = (
  flexProps: FlexboxProperties = {
    align: "flex",
    direction: "row",
    wrap: "nowrap",
    justify: "flex-start"
  }
) => {
  return css`
    align-items: ${flexProps.align};
    box-sizing: border-box;
    display: flex;
    justify-content: ${flexProps.justify};
    flex-direction: ${flexProps.direction};
    flex-wrap: ${flexProps.wrap};
    min-height: ${flexProps.direction === "column" ? 0 : null};
  `;
};

export const flexItem = (flexStrategy: "grow" | "shrink") =>
  css`
    box-sizing: border-box;
    ${flexStrategies[flexStrategy]};
  `;
