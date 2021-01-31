import { css, keyframes } from "@emotion/css";
import {
  themeBorder,
  themeBrandPrimary
} from "../design-tokens/build/js/designTokens";
import { hexToRgbA } from "../shared/styles/color";
import getCSSVarValue from "../utilities/getCSSVarValue";
import { ProgressBarSizes } from "./components/ProgressBar";

export const defaultBarColor = themeBrandPrimary;
const darkStripeColor = "rgba(0, 0, 0, 0.1)";
const stripeSize = "12px";
const stripeMotion = keyframes`
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: ${stripeSize} 0;
  }
`;

export const progressBar = size => css`
  background-color: ${hexToRgbA(getCSSVarValue(themeBorder), 0.65)};
  border-radius: 999px;
  display: block;
  height: ${size === ProgressBarSizes.LARGE ? "12px" : "6px"};
  width: 100%;
`;

export const progressBarFill = (color = defaultBarColor) => css`
  fill: ${color};
`;

export const progressBarStaged = css`
  animation: ${stripeMotion} 0.6s linear infinite;
  background-image: linear-gradient(
    45deg,
    transparent 25%,
    ${darkStripeColor} 25%,
    ${darkStripeColor} 50%,
    transparent 50%,
    transparent 75%,
    ${darkStripeColor} 75%,
    ${darkStripeColor} 100%
  );
  background-size: ${stripeSize} ${stripeSize};
`;

export const legendDot = (color = defaultBarColor) => css`
  background-color: ${color};
  border-radius: 999px;
  display: block;
  height: 6px;
  width: 6px;
`;
