import { css } from "@emotion/core";

export const display = (
  displayType:
    | "block"
    | "contents"
    | "flex"
    | "grid"
    | "inline"
    | "inherit"
    | "inline-block"
    | "inline-flex"
    | "inline-grid"
    | "inline-table"
    | "none"
    | "table"
    | "table-cell"
) => {
  return css`
    display: ${displayType};
  `;
};
