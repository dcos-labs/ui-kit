import { css } from "@emotion/css";

export const visuallyHidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  position: absolute;
  overflow: hidden;
  margin: -1px;
  padding: 0;
  width: 1px;
  height: 1px;
`;

export const undoVisuallyHidden = css`
  clip: initial;
  position: static;
  overflow: visible;
  margin: 0;
  width: auto;
  height: auto;
`;
