import { css } from "@emotion/core";

// TODO: better name than "details"?
// export const details = (isOpen?: boolean) => css`
//   height: ${isOpen ? "auto" : 0};
//   overflow: hidden;
//   visibility: ${isOpen ? "visible" : "hidden"};
// `;

const arrowDownBorders = css`
  border-top-color: inherit;
  border-left-width: 5px;
  border-right-width: 5px;
  border-bottom-width: 0;
  border-top-width: 6px;
`;

const arrowRightBorders = css`
  border-left-color: inherit;
  border-left-width: 6px;
  border-bottom-width: 5px;
  border-right-width: 0;
  border-top-width: 5px;
`;

export const toggler = (isOpen: boolean) => css`
  width: 100%;

  &:after {
    border-style: solid;
    border-color: transparent;
    content: "";
    display: inline-block;
    height: 0;
    line-height: 0;
    width: 0;
    ${isOpen ? arrowDownBorders : arrowRightBorders};
  }

  &:focus {
    outline: 0;
  }
`;
