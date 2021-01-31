import { css } from "@emotion/css";
import {
  borderRadiusSmall,
  borderRadiusDefault,
  themeBrandPrimary,
  themeSuccess,
  themeError,
  themeTextColorInteractive,
  themeTextColorInteractiveInverted,
  themeTextColorPrimary,
  themeTextColorPrimaryInverted,
  themeBgDisabled,
  themeBgDisabledInverted,
  themeTextColorDisabled,
  themeBgNeutral,
  themeBgNeutralInverted,
  themeBrandPrimaryInverted,
  themeSuccessInverted,
  themeErrorInverted,
  themeTextColorDisabledInverted
} from "../design-tokens/build/js/designTokens";
import { darken, pickReadableTextColor } from "../shared/styles/color";
import { ButtonAppearances } from "./components/ButtonBase";
import { tintContent } from "../shared/styles/styleUtils";
import getCSSVarValue from "../utilities/getCSSVarValue";

export const buttonPadding = {
  vert: "10px",
  horiz: "18px"
};

const getHoverColor = color => darken(color, 1);
const getActiveColor = color => darken(color, 2);

export const filledButton = (
  baseColor: string,
  hoverColor: string,
  activeColor: string,
  isInverse?: boolean
) => {
  const contentColor = isInverse
    ? themeTextColorPrimaryInverted
    : pickReadableTextColor(
        baseColor,
        getCSSVarValue(themeTextColorPrimary),
        getCSSVarValue(themeTextColorPrimaryInverted)
      );

  return css`
    ${tintContent(contentColor)};
    background-color: ${baseColor};
    border-radius: ${borderRadiusSmall};
    padding: ${buttonPadding.vert} ${buttonPadding.horiz};

    &[href],
    &[href]:visited {
      ${tintContent(contentColor)};
    }

    &:hover {
      background-color: ${hoverColor};
    }

    &:active {
      background-color: ${activeColor};
    }
  `;
};

const mutedButton = css`
  ${tintContent(themeTextColorDisabled)};
  cursor: default;
  pointer-events: none;

  &:hover,
  &:focus,
  &:active {
    ${tintContent(themeTextColorDisabled)};
  }
`;

const inverseMutedButton = css`
  ${tintContent(themeTextColorDisabledInverted)};
  cursor: default;

  &:hover,
  &:focus,
  &:active {
    ${tintContent(themeTextColorDisabledInverted)};
  }
`;

const mutedFilledButton = css`
  background-color: ${themeBgDisabled};
  &:hover,
  &:focus,
  &:active {
    background-color: ${themeBgDisabled};
  }
`;

const inverseMutedFilledButton = css`
  background-color: ${themeBgDisabledInverted};
  &:hover,
  &:focus,
  &:active {
    background-color: ${themeBgDisabledInverted};
  }
`;

export const processingTextStyle = css`
  &:after {
    content: "...";
  }
`;

export const buttonBase = css`
  cursor: pointer;
  display: inline-block;
  outline: none;
  text-decoration: none;
`;

export const buttonContent = css`
  outline: none;
`;

export const fullWidthButton = css`
  text-align: center;
  width: 100%;
`;

export const focusStyles = (
  bgColor: string,
  borderColor: string = bgColor
) => css`
  outline: none;
  position: relative;

  &:focus {
    background-color: ${bgColor};

    &:after {
      border: 2px solid ${borderColor};
      border-radius: ${borderRadiusDefault};
      bottom: -3px;
      content: "";
      left: -3px;
      position: absolute;
      right: -3px;
      top: -3px;
    }
  }
`;

export const focusStyleByAppearance = (appearance, isInverse) => {
  switch (appearance) {
    case "primary":
      return isInverse
        ? focusStyles(getHoverColor(getCSSVarValue(themeBrandPrimaryInverted)))
        : focusStyles(getHoverColor(getCSSVarValue(themeBrandPrimary)));
    case "secondary":
      return css`
        ${isInverse
          ? focusStyles(
              "transparent",
              getHoverColor(getCSSVarValue(themeTextColorInteractiveInverted))
            )
          : focusStyles(
              "transparent",
              getHoverColor(getCSSVarValue(themeTextColorInteractive))
            )};
        &:focus {
          &:after {
            border-radius: 0;
            border-left-width: 0;
            border-right-width: 0;
            border-top-width: 0;
          }
        }
      `;
    case "standard":
      return isInverse
        ? focusStyles(getHoverColor(getCSSVarValue(themeBgNeutralInverted)))
        : focusStyles(getHoverColor(getCSSVarValue(themeBgNeutral)));
    case "success":
      return isInverse
        ? focusStyles(getHoverColor(getCSSVarValue(themeSuccessInverted)))
        : focusStyles(getHoverColor(getCSSVarValue(themeSuccess)));
    case "danger":
      return isInverse
        ? focusStyles(getHoverColor(getCSSVarValue(themeErrorInverted)))
        : focusStyles(getHoverColor(getCSSVarValue(themeError)));
    default:
      return "";
  }
};

export const button = appearance => {
  switch (appearance) {
    case "primary":
      return filledButton(
        getCSSVarValue(themeBrandPrimary),
        getHoverColor(getCSSVarValue(themeBrandPrimary)),
        getActiveColor(getCSSVarValue(themeBrandPrimary))
      );
    case "secondary":
      return css`
        ${tintContent(themeTextColorInteractive)};
        &:hover {
          ${tintContent(
            getHoverColor(getCSSVarValue(themeTextColorInteractive))
          )};
        }
        &:active {
          ${tintContent(
            getActiveColor(getCSSVarValue(themeTextColorInteractive))
          )};
        }
        &[href],
        &[href]:visited {
          ${tintContent(themeTextColorInteractive)};
        }
      `;
    case "standard":
      return filledButton(
        getCSSVarValue(themeBgNeutral),
        getHoverColor(getCSSVarValue(themeBgNeutral)),
        getActiveColor(getCSSVarValue(themeBgNeutral))
      );
    case "success":
      return filledButton(
        getCSSVarValue(themeSuccess),
        getHoverColor(getCSSVarValue(themeSuccess)),
        getActiveColor(getCSSVarValue(themeSuccess))
      );
    case "danger":
      return filledButton(
        getCSSVarValue(themeError),
        getHoverColor(getCSSVarValue(themeError)),
        getActiveColor(getCSSVarValue(themeError))
      );
    default:
      return "";
  }
};

export const buttonInverse = appearance => {
  switch (appearance) {
    case "primary":
      return filledButton(
        getCSSVarValue(themeBrandPrimaryInverted),
        getHoverColor(getCSSVarValue(themeBrandPrimaryInverted)),
        getActiveColor(getCSSVarValue(themeBrandPrimaryInverted))
      );
    case "secondary":
      return css`
        ${tintContent(themeTextColorInteractiveInverted)};
        &:hover {
          ${tintContent(
            getHoverColor(getCSSVarValue(themeTextColorInteractiveInverted))
          )};
        }
        &:active {
          ${tintContent(
            getActiveColor(getCSSVarValue(themeTextColorInteractiveInverted))
          )};
        }
        &[href],
        &[href]:visited {
          ${tintContent(themeTextColorInteractiveInverted)};
        }
      `;
    case "standard":
      return filledButton(
        getCSSVarValue(themeBgNeutralInverted),
        getHoverColor(getCSSVarValue(themeBgNeutralInverted)),
        getActiveColor(getCSSVarValue(themeBgNeutralInverted))
      );
    case "success":
      return filledButton(
        getCSSVarValue(themeSuccessInverted),
        getHoverColor(getCSSVarValue(themeSuccessInverted)),
        getActiveColor(getCSSVarValue(themeSuccessInverted))
      );
    case "danger":
      return filledButton(
        getCSSVarValue(themeErrorInverted),
        getHoverColor(getCSSVarValue(themeErrorInverted)),
        getActiveColor(getCSSVarValue(themeErrorInverted))
      );
    default:
      return "";
  }
};

export const getMutedButtonStyles = (appearance: ButtonAppearances) => {
  return appearance !== "secondary"
    ? css`
        ${mutedButton};
        ${mutedFilledButton};
      `
    : mutedButton;
};

export const getInverseMutedButtonStyles = (appearance: ButtonAppearances) => {
  return appearance !== "secondary"
    ? css`
        ${inverseMutedButton};
        ${inverseMutedFilledButton};
      `
    : inverseMutedButton;
};

export const pointerCursor = css`
  cursor: pointer;
`;

// Replicates default browser focus ring styles.
//
// The media query targets Webkit browsers, which can
// more accurately replicate the native focus ring style
export const keyboardFocus = css`
  > div:focus {
    outline: none;
  }

  &:focus > div {
    outline-color: Highlight;
    outline-width: thin;

    @media (-webkit-min-device-pixel-ratio: 0) {
      outline-color: -webkit-focus-ring-color;
      outline-style: auto;
      outline-width: unset;
    }
  }
`;
