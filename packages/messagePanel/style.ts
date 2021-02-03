import { css } from "@emotion/css";

export const messagePanelContainer = css`
  display: grid;
  grid-template-columns: minmax(min(450px, 100%), min-content);
  justify-content: center;
`;

export const vertAlignHeading = css`
  vertical-align: middle;
`;

export const messagePanelWithGraphicBody = css`
  margin: 0 auto;
  max-width: 42em;
`;

export const messagePanelGraphic = css`
  display: block;
  margin: 0 auto;
  max-width: 100%;
`;
