import { css } from "@emotion/css";
import {
  blueDarken4,
  blueLighten3,
  blueLighten4,
  borderRadiusDefault,
  greyDark,
  greyLightDarken3,
  greyLight,
  themeError,
  themeSuccess,
  themeWarning
} from "../design-tokens/build/js/designTokens";
import { lighten, darken } from "../shared/styles/color";
import getCSSVarValue from "../utilities/getCSSVarValue";

const infoBoxAppearances = appearance => {
  switch (appearance) {
    case "default":
      return css`
        background-color: ${greyLight};
        border-bottom-color: ${greyLightDarken3};
        color: ${greyDark};
      `;
    case "danger":
      return css`
        background-color: ${lighten(getCSSVarValue(themeError), 4)};
        border-bottom-color: ${lighten(getCSSVarValue(themeError), 3)};
        color: ${darken(getCSSVarValue(themeError), 4)};
      `;
    case "info":
      return css`
        background-color: ${blueLighten4};
        border-bottom-color: ${blueLighten3};
        color: ${blueDarken4};
      `;
    case "success":
      return css`
        background-color: ${lighten(getCSSVarValue(themeSuccess), 4)};
        border-bottom-color: ${lighten(getCSSVarValue(themeSuccess), 3)};
        color: ${darken(getCSSVarValue(themeSuccess), 4)};
      `;
    case "warning":
      return css`
        background-color: ${lighten(getCSSVarValue(themeWarning), 4)};
        border-bottom-color: ${lighten(getCSSVarValue(themeWarning), 3)};
        color: ${darken(getCSSVarValue(themeWarning), 4)};
      `;
    default:
      return "";
  }
};

export const infoBoxContentWrap = css`
  display: inline-flex;
  flex-wrap: wrap;
`;

export const infoBoxActions = css`
  display: inline-flex;
  margin-left: auto;
`;

export const infoBox = appearance =>
  css`
    ${infoBoxAppearances(appearance)};
    display: flex;
    justify-content: space-between;
    overflow: auto;
    word-break: break-word;
  `;

export const infoBoxInline = css`
  border-radius: ${borderRadiusDefault};
`;

export const infoBoxBanner = css`
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;

export const primaryActionStyle = css`
  order: 1;
`;

export const dismissBtn = css`
  cursor: pointer;
  line-height: 0;
  opacity: 0.5;
`;
