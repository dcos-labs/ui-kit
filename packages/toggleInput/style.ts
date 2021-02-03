import { css } from "@emotion/css";
import {
  spaceS,
  themeBorder,
  themeBgPrimary,
  themeBgDisabled,
  themeBrandPrimary,
  themeError,
  themeSuccess,
  themeTextColorDisabled,
  borderRadiusSmall,
  spaceXxs
} from "../design-tokens/build/js/designTokens";

const toggleInputHeight = 16;
const toggleInputBorderWidth = 1;
const toggleInputTextPadding = spaceS;

export const toggleInput = css`
  border-color: ${themeBorder};
  background-color: ${themeBgPrimary};
  border-style: solid;
  border-width: ${toggleInputBorderWidth}px;
  height: ${toggleInputHeight - toggleInputBorderWidth * 2}px;
  width: ${toggleInputHeight - toggleInputBorderWidth * 2}px;
`;

export const toggleInputLabel = css`
  padding-left: ${toggleInputTextPadding};
`;

export const toggleInputFeedbackText = css`
  padding-left: ${toggleInputHeight + parseInt(toggleInputTextPadding, 10)}px;
`;

export const toggleInputApperances = {
  disabled: css`
    background-color: ${themeBgDisabled};
    border-color: ${themeBgDisabled};
  `,
  "standard-focus": css`
    border-color: ${themeBrandPrimary};
  `,
  "error-focus": css`
    border-color: ${themeError};
  `,
  "success-focus": css`
    border-color: ${themeSuccess};
  `,
  "standard-active": css`
    background-color: ${themeBrandPrimary};
    border-color: ${themeBrandPrimary};
  `,
  "error-active": css`
    background-color: ${themeError};
    border-color: ${themeError};
  `,
  "success-active": css`
    background-color: ${themeSuccess};
    border-color: ${themeSuccess};
  `,
  "disabled-active": css`
    background-color: ${themeTextColorDisabled};
    border-color: ${themeTextColorDisabled};
  `,
  "focus-active": css`
    box-shadow: inset 0px 0px 0px 1px ${themeBgPrimary};
  `
};

export const checkboxInput = css`
  border-radius: ${borderRadiusSmall};
  position: relative;
`;

export const radioInput = css`
  border-radius: 999px;
  position: relative;
`;

export const radioInputChecked = css`
  &:after {
    background-color: ${themeBgPrimary};
    border-radius: 999px;
    content: "";
    position: absolute;
    top: ${spaceXxs};
    bottom: ${spaceXxs};
    left: ${spaceXxs};
    right: ${spaceXxs};
  }
`;

// This awful style is necessary to beat the
// specificity of the 4px bottom margin on
// <label> from CNVS.
//
// Remove once we've stopped using CNVS
export const bruteForceKillLabelMargin = css`
  margin-bottom: 0 !important;
`;
