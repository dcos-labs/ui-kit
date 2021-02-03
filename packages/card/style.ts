import { css } from "@emotion/css";
import { borderRadius } from "../shared/styles/styleUtils/index";
import {
  themeBgPrimary,
  themeBorder,
  themeBrandPrimary,
  themeBgDisabled,
  themeTextColorDisabled,
  themeBgHover
} from "../design-tokens/build/js/designTokens";

export const cardBase = css`
  background-color: ${themeBgPrimary};
  box-shadow: 0 0 0 1px ${themeBorder};
  ${borderRadius("default")};

  > div {
    height: 100%;
  }
`;

const buttonCardFocusStyles = `
  box-shadow: 0 0 0 1px ${themeBrandPrimary};
  outline: 0;
`;

const buttonCardActiveStyles = `
  box-shadow: 0 0 0 2px ${themeBrandPrimary};
`;

const buttonCardFocusedActiveStyles = `background-color: ${themeBgHover};`;

export const buttonCard = css`
  cursor: pointer;

  &:hover,
  &:focus,
  &:focus-within {
    ${buttonCardFocusStyles};
  }

  &:active {
    ${buttonCardActiveStyles};
  }
`;

export const buttonCardActive = css`
  &,
  &:hover,
  &:focus {
    ${buttonCardActiveStyles};
  }

  &:focus {
    ${buttonCardFocusedActiveStyles};
  }
`;

export const buttonCardFocused = css`
  ${buttonCardFocusStyles};
`;

export const buttonCardDisabled = css`
  background-color: ${themeBgDisabled};
  color: ${themeTextColorDisabled};
  cursor: auto;

  &,
  &:hover,
  &:focus {
    box-shadow: 0 0 0 0 transparent;
  }
`;

export const buttonCardDisabledActive = css`
  &,
  &:hover,
  &:focus {
    box-shadow: 0 0 0 2px ${themeBorder};
  }
`;

export const buttonCardFocusedActive = css`
  ${buttonCardFocusedActiveStyles};
`;

export const cardWithLink = css`
  position: relative;
`;

export const cardLink = css`
  bottom: 0;
  left: 0;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;
`;
