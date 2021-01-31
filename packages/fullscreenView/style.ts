import { css } from "@emotion/css";
import {
  themeBgSecondary,
  borderColorDefault
} from "../design-tokens/build/js/designTokens";

export const fullscreenModalHeader = css`
  background-color: ${themeBgSecondary};
  box-sizing: border-box;
  border-bottom: 1px solid ${borderColorDefault};
`;

export const fullscreenModalTitle = css`
  text-align: center;
`;

export const fullscreenModalAction = {
  dismiss: css`
    text-align: left;
  `,
  cta: css`
    text-align: right;
  `
};

export const modalContent = css`
  box-sizing: border-box;
  overflow: auto;
`;
