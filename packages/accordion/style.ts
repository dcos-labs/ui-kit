import { css } from "@emotion/css";
import {
  themeError,
  themeBgHover,
  themeBgPrimary,
  themeBgDisabled,
  themeTextColorDisabled,
  borderRadiusSmall
} from "../design-tokens/build/js/designTokens";
import { lighten } from "../shared/styles/color";
import { getCSSVarValue } from "../utilities";

export const fillWidth = css`
  display: block;
  width: 100%;
`;

export const accordionTitle = css`
  background-color: ${themeBgPrimary};
  border-radius: ${borderRadiusSmall};
  position: relative;

  &:hover,
  &:focus-within {
    background-color: ${themeBgHover};
  }
`;

export const accordionTitleExpanded = css`
  border-radius: ${borderRadiusSmall} ${borderRadiusSmall} 0 0;
`;

export const accordionTitleDisabled = css`
  background-color: ${themeBgDisabled};
  color: ${themeTextColorDisabled};

  &:hover,
  &:focus-within {
    background-color: ${themeBgDisabled};
  }
`;

export const accordionTitleDanger = css`
  background-color: ${lighten(getCSSVarValue(themeError), 5)};
  border-color: ${themeError};

  &:hover,
  &:focus-within {
    background-color: ${lighten(getCSSVarValue(themeError), 4)};
  }
`;

export const accordionButtonOverlay = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;

  &:focus {
    outline: 0;
  }
`;

export const accordionTitleInteractive = css`
  pointer-events: none;
  position: relative;
  z-index: 1;
`;

export const accordionItemContent = css`
  border-radius: 0 0 ${borderRadiusSmall} ${borderRadiusSmall};
  border-top-width: 0;
`;
