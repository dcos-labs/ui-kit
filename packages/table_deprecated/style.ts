import { css } from "@emotion/css";
import { hexToRgbA } from "../shared/styles/color";

import {
  black,
  themeBgHover,
  themeBorderHeavy,
  themeBorder
} from "../design-tokens/build/js/designTokens";
import { pseudoElTriangle } from "../shared/styles/styleUtils";

const pointerSize = 4;
const pointerSpace = 4;
const cellPadding = 7;

export const headerCss = css`
  box-sizing: border-box;
  border-top: 1px solid ${themeBorderHeavy};
  border-bottom: 1px solid ${themeBorderHeavy};
`;

export const headerHover = css`
  &:hover,
  &:active {
    .staticClass_dragHandleWrapper {
      visibility: visible;
    }
  }
`;

export const headerCellCss = css`
  font-weight: bold;
`;

export const headerCellInner = css`
  align-items: center;
  max-width: 100%;
  position: relative;
  z-index: 2;
`;

export const textCapitalize = css`
  text-transform: capitalize;
`;

export const resizingHeader = css`
  cursor: col-resize;
  user-select: none;
`;

export const cellCss = css`
  box-sizing: border-box;
  border-bottom: 1px solid ${themeBorder};
  white-space: nowrap;
`;

export const innerCellCss = css`
  height: auto;
  box-sizing: border-box;
  padding: ${cellPadding}px;
  z-index: 2;
`;

export const cellAlignmentCss = (textAlign: string) => css`
  text-align: ${textAlign};
  padding-right: ${textAlign === "right"
    ? `${pointerSize + pointerSpace + cellPadding}px`
    : null};
`;

export const preventSortOverlap = (iconSizePx: number) => css`
  & > div {
    margin-right: ${iconSizePx + pointerSize + pointerSpace}px;
  }
`;

export const tableCss = css`
  font-weight: normal;

  &::after {
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    pointer-events: none;
    top: 0;
    width: 100%;
  }
`;

export const rightGrid = css`
  background: linear-gradient(
    to right,
    ${hexToRgbA(black, 0.2)},
    ${hexToRgbA(black, 0)}
  );
  background-repeat: no-repeat;
  background-size: 8px 100%;
`;

//
// !important is needed to beat the inline style
// coming from react-virtualized :(
//
export const topLeftGrid = css`
  overflow: unset !important;
`;

export const unsetContainerOverflow = css`
  .ReactVirtualized__Grid__innerScrollContainer {
    overflow: unset !important;
  }
`;

export const hideScrollbarCss = css`
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const rowHoverStyles = `
  background-color: ${themeBgHover};
  mix-blend-mode: multiply;
  will-change: left;
`;

export const sortableHeaderIconBaseCSS = css`
  position: relative;
  &:after {
    content: "";
    display: inline-block;
    line-height: 0;
    margin-left: ${pointerSpace}px;
    margin-top: -${pointerSize / 2}px;
    vertical-align: middle;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const styleArrowDirection = displaySortDirection => {
  switch (displaySortDirection) {
    case "DESC":
      return css`
        &:after {
          ${pseudoElTriangle("top", pointerSize, "currentColor")};
        }
      `;
    case "ASC":
      return css`
        &:after {
          ${pseudoElTriangle("bottom", pointerSize, "currentColor")};
        }
      `;
    default:
      return css`
        &:after {
          visibility: hidden;
        }
      `;
  }
};

export const scrollbarMeas = css`
  height: 100px;
  overflow: scroll;
  msoverflowstyle: scrollbar;
  opacity: 0;
  position: absolute;
  top: -100000px;
  visibility: hidden;
  width: 100px;
`;

export const draggableContainer = css`
  mix-blend-mode: multiply;
  position: relative;
  z-index: 1;
`;

export const dragHandleWrapper = css`
  background-clip: content-box;
  height: 100%;
  position: absolute;
  right: 0;
`;

export const dragHandle = css`
  cursor: col-resize;
  height: 100%;
  visibility: hidden;
  &:hover,
  &:active {
    .staticClass_dragHandleWrapper {
      background-color: ${themeBgHover};
    }
  }
`;
