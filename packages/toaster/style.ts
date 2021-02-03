import { css } from "@emotion/css";
import { atMediaUp } from "../shared/styles/breakpoints";
import {
  borderRadiusDefault,
  themeBgPrimaryInverted
} from "../design-tokens/build/js/designTokens";

export const toaster = css`
  max-width: 100%;
  ${atMediaUp.medium(css`
    max-width: 20em;
  `)};
`;

export const preTransitionStyle = duration => css`
  transition: opacity ${duration}ms ease-in-out,
    transform ${duration}ms ease-in-out;
  opacity: 0;
  transform: translateY(20px);
`;

export const transitionStyles = {
  entered: css`
    opacity: 1;
    transform: translateY(0);
  `,
  exiting: css`
    opacity: 0;
    transform: translateY(0);
  `
};

export const toast = css`
  background-color: ${themeBgPrimaryInverted};
  box-sizing: border-box;
  border-radius: ${borderRadiusDefault};
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "title dismiss"
    "desc  desc"
    "btn   btn";
  width: 100%;
`;

export const toastTitle = css`
  grid-area: title;
  text-transform: capitalize;
`;

export const toastDesc = css`
  grid-area: desc;
`;

export const toastActions = css`
  grid-area: btn;
`;

export const toastDismiss = css`
  grid-area: dismiss;
`;
