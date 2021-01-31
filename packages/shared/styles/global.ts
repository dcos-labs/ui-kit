import { injectGlobal } from "@emotion/css";
import { textSize, tintContent, inverseColorMode } from "./styleUtils";
import {
  fontFamilySansSerif,
  themeTextColorPrimaryInverted
} from "../../design-tokens/build/js/designTokens";
import { normalize } from "./normalize";

// this is used to remove top and bottom margins for <p> and <h1-6> tags
//
// removing the margin directly in the <Text> component styles makes it impossible to use
// child selectors to change the margins.
// e.g.: using the Stack or TextBlock components.
export const staticClass_resetTextMargin = "rmTextMargins";

export const injectGlobalCss = () => {
  return injectGlobal`
    ${normalize};

    .${staticClass_resetTextMargin} {
      margin-top: 0;
      margin-bottom: 0;
    }

    .ReactVirtualized__Grid {
      outline: none;
    }

    .${inverseColorMode} {
      ${tintContent(themeTextColorPrimaryInverted)};
    }
  `;
};

const flattenObject = obj =>
  Object.keys(obj).reduce((acc, k) => {
    if (typeof obj[k] === "object") {
      Object.assign(acc, flattenObject(obj[k]));
    } else {
      acc[k] = obj[k];
    }
    return acc;
  }, {});

export const injectCustomProperties = appTheme => {
  const themeProperties = flattenObject(appTheme);
  const customProperties = Object.keys(themeProperties).reduce((acc, curr) => {
    acc += `--theme${curr.charAt(0).toUpperCase() + curr.slice(1)}: ${
      themeProperties[curr]
    };`;
    return acc;
  }, "");

  return injectGlobal`
    :root {
      ${customProperties}
    }
  `;
};

export const injectStorybookResetCss = () => {
  return injectGlobal`
    body {
        font-family: ${fontFamilySansSerif};
        ${textSize("m")};
    }
  `;
};
