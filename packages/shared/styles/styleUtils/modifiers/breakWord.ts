import { css } from "@emotion/css";

// word-wrap is needed to support browsers in languages other than English
export const breakWord = css`
  hyphens: auto;
  word-wrap: break-word;
`;
