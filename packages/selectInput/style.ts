import { css } from "@emotion/css";
import {
  spaceM,
  spaceXs,
  themeTextColorPrimary
} from "../design-tokens/build/js/designTokens";
import { iconSizes } from "../shared/styles/styleUtils/layout/iconSizes";

export const DROPDOWN_ARROW_ICON_SIZE = "xs";

export const selectContainer = css`
  position: relative;
`;

export const select = css`
  appearance: none;
  color: inherit;
  font-size: inherit;
  padding-right: ${parseInt(iconSizes[DROPDOWN_ARROW_ICON_SIZE], 10) +
    parseInt(spaceM, 10)}px;
  width: 100%;

  /*
   * Firefox hack to hide the
   * focus ring, but still
   * show the text
   */
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 ${themeTextColorPrimary};
  }

  &::-ms-expand {
    display: none;
  }
`;

export const selectIcon = css`
  font-size: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const optionalIcon = css`
  margin: auto ${spaceXs} auto 0;
`;
