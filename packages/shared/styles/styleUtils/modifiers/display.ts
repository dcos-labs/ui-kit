import { css } from "@emotion/css";

export const display = (displayType: React.CSSProperties["display"]) => {
  return css`
    display: ${displayType};
  `;
};
