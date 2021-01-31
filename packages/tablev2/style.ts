import { css } from "@emotion/css";
import * as dt from "../design-tokens/build/js/designTokens";
import {
  border,
  padding,
  pseudoElTriangle,
  textTruncate,
  textWeight
} from "../shared/styles/styleUtils";
import { iconSizes } from "../shared/styles/styleUtils/layout/iconSizes";
import { spaceSizes } from "../shared/styles/styleUtils/modifiers/modifierUtils";
import { linkReset } from "../shared/styles/styleUtils/resets/linkReset";

export const RESIZE_ICON_SIZE = "xxs";
const RESIZE_ICON_SIZE_WITH_UNIT = iconSizes[RESIZE_ICON_SIZE];

// Note: using `display: grid` to ensure row widths are always as wide as their cells. Using the default `display: block` cuts the row width where the scroll begins.
// Note: `z-index: ${dt.zIndexContent}` is used to create a new stacking context, ensuring the table content is below any overlays such as a modal
export const table = css`
  display: grid;
  grid-auto-rows: max-content;
  position: relative;
  overflow: auto;
  z-index: ${dt.zIndexContent};
`;

export const row = (gridTemplateFragments: string[]) => css`
  ${border("bottom")};
  display: grid;
  grid-template-columns: ${gridTemplateFragments.join(" ")};
`;

export const rowWithStickyColumn = css`
  > [role="gridcell"],
  > [role="columnheader"] {
    &:first-child {
      position: sticky;
      left: 0;
      z-index: 1;
    }
  }
`;

export const headerRow = css`
  ${border("vert", "heavy")};
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const highlightedRow = css`
  &,
  & > [role="gridcell"] {
    background-color: ${dt.themeBgHover};
  }
`;

export const contentRow = css`
  &:hover {
    ${highlightedRow};
  }
`;

const sortTriangleWidthPx = 8;
const sortTriangleMarginPx = 4;
export const sortable = (dir: "asc" | "desc" | null) => css`
  position: relative;
  &:after {
    content: "";
    display: ${dir ? "inline-block" : "none"};
    line-height: 0;
    margin-left: ${sortTriangleMarginPx}px;
    margin-right: -${sortTriangleWidthPx + sortTriangleMarginPx}px;
    vertical-align: middle;
    ${pseudoElTriangle(
      dir === "desc" ? "top" : "bottom",
      // We're dividing by 2 because the triangle is an aspect ratio of 2:1
      sortTriangleWidthPx / 2,
      "currentColor"
    )};
  }
  &:hover {
    &:after {
      display: inline-block;
    }
  }
`;

// the max-width ensures long header text will be truncated
export const sortableButton = css`
  max-width: 100%;
`;

// min-width: 0 is needed to support text truncation in columns that are sized with the `fr` unit
const cellPaddingSize = "xs";
export const cell = (textAlign: React.CSSProperties["textAlign"]) => css`
  ${padding("all", cellPaddingSize)};
  ${textTruncate};
  background-color: ${dt.themeBgPrimary};
  min-width: 0;
  padding-right: calc(
    ${spaceSizes[cellPaddingSize]} + ${RESIZE_ICON_SIZE_WITH_UNIT}
  );
  position: relative;
  text-align: ${textAlign};

  &:first-child {
    transition: box-shadow 200ms ease-out;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    a {
      ${linkReset};
      ${textWeight("medium")};
    }
  }
`;

export const makeSpaceForSortIndicator = css`
  padding-right: calc(
    ${spaceSizes[cellPaddingSize]} + ${RESIZE_ICON_SIZE_WITH_UNIT} +
      ${sortTriangleWidthPx + sortTriangleMarginPx}px
  );
`;

export const headerCell = (textAlign: React.CSSProperties["textAlign"]) =>
  css`
    ${cell(textAlign)};
    ${textWeight("medium")};
    overflow: visible;
    white-space: nowrap;
    --draggable-opacity: 0;
    &:hover {
      --draggable-opacity: 1;
    }
    &:active ~ * {
      user-select: none;
    }
  `;

// The clip-path ensures the box-shadow only goes horizontally
export const rowScrollShadow = css`
  &:first-child {
    box-shadow: 4px 0px 6px 0 rgba(0, 0, 0, 0.12),
      2px 0px 2px 0 rgba(0, 0, 0, 0.06);
    clip-path: polygon(120% 0%, 0% 0%, 0% 100%, 120% 100%);
  }
`;

export const cellFlexWrapper = css`
  display: inline-flex;
  max-width: 100%;
`;

export const tableScrollObserver = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1px;
`;
