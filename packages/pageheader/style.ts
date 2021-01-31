import { css } from "@emotion/css";

export const fillHeight = css`
  height: 100%;
  display: flex;
  flex-direction: column;

  > * {
    flex-shrink: 0;
  }
`;
