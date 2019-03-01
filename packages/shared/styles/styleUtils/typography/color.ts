import { css } from "@emotion/core";
import {
  textColorPrimary,
  textColorPrimaryInverted,
  textColorSecondary,
  textColorSecondaryInverted
} from "../../../../design-tokens/build/js/designTokens";

// TODO: when we do the design tokens lib,
// generate a type for _only_ our colors
// instead of just accepting any string
export const tintText = (color: string) => css`
  color: ${color};
`;

export const tintSVG = (color: string) => css`
  fill: ${color};
`;

export const tintContent = (color: string) => css`
  ${tintText(color)};
  ${tintSVG(color)};
`;

export const darkMode = css`
  ${tintContent(textColorPrimaryInverted)};
`;

export const tintContentPrimary = css`
  ${tintContent(textColorPrimary)};

  ${darkMode} &,
  &${darkMode} {
    ${tintContent(textColorPrimaryInverted)};
  }
`;

export const tintContentSecondary = css`
  ${tintContent(textColorSecondary)};

  ${darkMode} &,
  &${darkMode} {
    ${tintContent(textColorSecondaryInverted)};
  }
`;
