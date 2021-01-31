import { css } from "@emotion/css";
import {
  borderRadiusSmall,
  themeTextColorDisabled,
  themeSuccess,
  themeBorder,
  themeBgPrimary,
  themeTextColorPrimary,
  themeBrandPrimary,
  themeError,
  themeBgDisabled,
  iconSizeXs
} from "../../design-tokens/build/js/designTokens";

import {
  padding,
  flush,
  margin,
  textWeight,
  display,
  tintContent
} from "./styleUtils";
import getCSSVarValue from "../../utilities/getCSSVarValue";
import { hexToRgbA } from "./color";
const getFocusFieldBg = color => hexToRgbA(color, 0.05);

export const textInputHeight = 36;

export const inputIconWrapper = css`
  svg {
    max-width: ${iconSizeXs};
    height: auto;
  }
`;

export const getIconAppearanceStyle = appearance => {
  switch (appearance) {
    case "standard":
      return css`
        svg {
          fill: ${themeTextColorPrimary};
        }
      `;
    case "disabled":
      return css`
        svg {
          fill: ${themeTextColorDisabled};
        }
      `;
    case "error":
      return css`
        svg {
          fill: ${themeError};
        }
      `;
    case "success":
      return css`
        svg {
          fill: ${themeSuccess};
        }
      `;
    case "standard-focus":
      return css`
        svg {
          fill: ${themeBrandPrimary};
        }
      `;
    case "error-focus":
      return css`
        svg {
          fill: ${themeError};
        }
      `;
    case "success-focus":
      return css`
        svg {
          fill: ${themeSuccess};
        }
      `;
    default:
      return "";
  }
};

export const getInputAppearanceStyle = appearance => {
  switch (appearance) {
    case "standard":
      return css`
        background-color: ${themeBgPrimary};
        border-color: ${themeBorder};

        &:focus {
          background-color: ${getFocusFieldBg(
            getCSSVarValue(themeBrandPrimary)
          )};
          border-color: ${themeBrandPrimary};
        }
      `;
    case "disabled":
      return css`
        background-color: ${themeBgDisabled};
        border-color: ${themeBgDisabled};
        color: ${themeTextColorDisabled};

        &::placeholder {
          color: ${themeTextColorDisabled};
        }

        input {
          color: ${themeTextColorDisabled};
          ::placeholder {
            color: ${themeTextColorDisabled};
          }
        }
      `;
    case "error":
      return css`
        background-color: ${themeBgPrimary};
        border-color: ${themeError};

        &:focus {
          background-color: ${getFocusFieldBg(getCSSVarValue(themeError))};
        }
      `;
    case "success":
      return css`
        background-color: ${themeBgPrimary};
        border-color: ${themeSuccess};

        &:focus {
          background-color: ${getFocusFieldBg(getCSSVarValue(themeSuccess))};
        }
      `;
    case "standard-focus":
      return css`
        background-color: ${getFocusFieldBg(getCSSVarValue(themeBrandPrimary))};
        border-color: ${themeBrandPrimary};
      `;
    case "error-focus":
      return css`
        background-color: ${getFocusFieldBg(getCSSVarValue(themeError))};
        border-color: ${themeError};
      `;
    case "success-focus":
      return css`
        background-color: ${getFocusFieldBg(getCSSVarValue(themeSuccess))};
        border-color: ${themeSuccess};
      `;
    default:
      return "";
  }
};

export const inputContainer = css`
  border: 1px solid;
  border-radius: ${borderRadiusSmall};
  color: inherit;
  height: ${textInputHeight}px;
  font-size: inherit;
  ${padding("horiz", "m")};
  &::placeholder {
    color: ${themeTextColorPrimary};
    opacity: 0.4;
  }
  input {
    font-size: inherit;
    color: inherit;
    &::placeholder {
      color: ${themeTextColorPrimary};
      opacity: 0.4;
    }
  }
`;

export const getLabelStyle = (hasError?: boolean) => css`
  ${display("block")};
  ${flush("top")};
  ${margin("bottom", "xxs")};
  ${textWeight("medium")};
  ${hasError ? tintContent(themeError) : null};
`;
