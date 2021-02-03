import { css } from "@emotion/css";
import {
  themeBgHover,
  themeTextColorPrimary,
  themeTextColorPrimaryInverted,
  borderRadiusDefault,
  themeBorder
} from "../design-tokens/build/js/designTokens";
import { pickReadableTextColor, darken } from "../shared/styles/color";
import getCSSVarValue from "../utilities/getCSSVarValue";
import { buttonPadding } from "../button/style";

export const staticKeyboardFocusClassname = "static_segmentKeyboardFocus";

export const segmentedControlContainer = css`
  display: flex;
  overflow: hidden;
  white-space: nowrap;
`;

export const segmentedControlButton = css`
  align-items: center;
  border-color: ${themeBorder};
  border-width: 1px;
  border-style: solid;
  border-right-width: 0;
  cursor: pointer;
  display: inline-flex;

  &:first-child {
    border-radius: ${borderRadiusDefault} 0 0 ${borderRadiusDefault};
  }

  &:last-child {
    border-radius: 0 ${borderRadiusDefault} ${borderRadiusDefault} 0;
    border-right-width: 1px;
  }

  &:hover,
  &:focus-within {
    background-color: ${themeBgHover};
    color: ${pickReadableTextColor(
      getCSSVarValue(themeBgHover),
      getCSSVarValue(themeTextColorPrimary),
      getCSSVarValue(themeTextColorPrimaryInverted)
    )};
  }
`;

export const segmentedControlButtonInner = css`
  padding: ${buttonPadding.vert} ${buttonPadding.horiz};
`;

export const segmentedControlButtonActive = css`
  background-color: ${themeBorder};
  border-color: ${themeBorder};
  color: ${pickReadableTextColor(
    getCSSVarValue(themeBorder),
    getCSSVarValue(themeTextColorPrimary),
    getCSSVarValue(themeTextColorPrimaryInverted)
  )};

  &:hover,
  &:focus-within {
    background-color: ${themeBorder};
    color: ${pickReadableTextColor(
      getCSSVarValue(themeBorder),
      getCSSVarValue(themeTextColorPrimary),
      getCSSVarValue(themeTextColorPrimaryInverted)
    )};
  }

  &.${staticKeyboardFocusClassname}:focus-within {
    background-color: ${darken(getCSSVarValue(themeBorder), 1)};
    border-color: ${darken(getCSSVarValue(themeBorder), 1)};
  }
`;
