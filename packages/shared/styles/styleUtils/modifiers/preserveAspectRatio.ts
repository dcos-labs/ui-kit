import { css } from "@emotion/css";

export const preserveAspectRatio = (width, height) => css`
  &::before {
    content: "";
    height: 0;
    float: left;
    margin-left: -1px;
    padding-top: ${(height / width) * 100}%;
    width: 1px;
  }

  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;
