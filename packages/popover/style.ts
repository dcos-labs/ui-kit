import { css } from "@emotion/css";
import {
  borderRadiusDefault,
  themeBgPrimary,
  themeBgHover,
  themeBorder
} from "../design-tokens/build/js/designTokens";
import { Direction } from "../dropdownable/components/Dropdownable";
import { getContainerCaret } from "../shared/styles/containerWithCaret";

export const menuList = css`
  background-color: ${themeBgPrimary};
  border-radius: ${borderRadiusDefault};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

// Hides unnecessary horizontal scrollbars on Linux and Microsoft
export const hideHoriztonalScroll = css`
  overflow-x: hidden;
`;

export const menuListItem = css`
  box-sizing: border-box;
  cursor: pointer;
  min-width: 100%;
`;

export const menuListItemActive = css`
  background-color: ${themeBgHover};
`;

export const getPopoverBoxArrow = (direction: Direction) => css`
  ${getContainerCaret(direction, themeBgPrimary, themeBorder)};
`;
