import { css } from "@emotion/css";
import {
  borderRadiusSmall,
  greyLight,
  themeSuccess,
  themeWarning,
  themeError,
  themeBrandPrimary,
  themeBgPrimary,
  themeTextColorPrimary,
  themeTextColorPrimaryInverted,
  themeBorder
} from "../design-tokens/build/js/designTokens";
import { pickReadableTextColor } from "../shared/styles/color";
import getCSSVarValue from "../utilities/getCSSVarValue";

const badgeAppearanceStyle = (color, isOutlined?: boolean) => {
  const bgColor = isOutlined ? getCSSVarValue(themeBgPrimary) : color;

  return css`
    background-color: ${bgColor};
    border-color: ${color};
    color: ${pickReadableTextColor(
      bgColor,
      getCSSVarValue(themeTextColorPrimary),
      getCSSVarValue(themeTextColorPrimaryInverted)
    )};
  `;
};

const badgeAppearance = appearance => {
  switch (appearance) {
    case "default":
      return badgeAppearanceStyle(greyLight);
    case "success":
      return badgeAppearanceStyle(getCSSVarValue(themeSuccess));
    case "primary":
      return badgeAppearanceStyle(getCSSVarValue(themeBrandPrimary));
    case "warning":
      return badgeAppearanceStyle(getCSSVarValue(themeWarning));
    case "danger":
      return badgeAppearanceStyle(getCSSVarValue(themeError));
    case "outline":
      return badgeAppearanceStyle(getCSSVarValue(themeBorder), true);
    case "outline-primary":
      return badgeAppearanceStyle(getCSSVarValue(themeBrandPrimary), true);
  }
};

export const badge = appearance => {
  return css`
    ${badgeAppearance(appearance)};
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    padding: 0 8px 0;
    font-size: 80%;
    line-height: 20px;
    text-decoration: none;
    text-rendering: optimizeLegibility;
    border-radius: ${borderRadiusSmall};
    align-items: center;
    display: inline-flex;
    justify-content: center;
  `;
};
