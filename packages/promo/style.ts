import { css } from "@emotion/css";
import { GradientColors, GradientStyle } from "./types";
import {
  blueLighten4,
  spaceS,
  textBlockWidth,
  themeBgSecondary,
  themeTextColorPrimaryInverted
} from "../design-tokens/build/js/designTokens";

export const bannerContainer = (isDarkBackground?: boolean) => css`
  position: relative;
  color: ${isDarkBackground ? themeTextColorPrimaryInverted : "inherit"};
`;
export const dismissButton = css`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: ${spaceS};
`;
export const heroImg = css`
  height: 100%;
  min-height: 150px;
  min-width: 200px;
`;
export const checkboxContainer = css`
  align-items: flex-end;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: flex-end;
`;

export const bodyTextMaxWidth = css`
  max-width: ${textBlockWidth};
`;

export const graphicContainer = css`
  box-sizing: border-box;
  height: 100%;
`;

export const gradientStyles: Record<GradientStyle, GradientColors> = {
  lightBlue: [themeBgSecondary, blueLighten4],
  // these colors are not in ui-kit, but this is what was spec'd by the design team
  purple: ["#440099", "#36007A"]
};

export const getBackgroundGradient = (gradientStyle?: GradientStyle) =>
  gradientStyle
    ? css`
        background-image: linear-gradient(
          90deg,
          ${gradientStyles[gradientStyle][0]} 0%,
          ${gradientStyles[gradientStyle][1]} 100%
        );
      `
    : "";
