import { css } from "@emotion/core";
import { atMediaUp } from "../shared/styles/breakpoints";
import {
  greyDarkLighten2,
  purple,
  spaceM,
  spaceL,
  spaceXl
} from "../design-tokens/build/js/designTokens";
import { padding } from "../shared/styles/styleUtils";

const iconSize = "24px";
const layoutBreakpoint = "large";

export const appChrome = css`
  height: 100%;
  overflow: hidden;
`;

export const appChromeInsetContent = css`
  padding-left: ${spaceL};
  padding-right: ${spaceL};

  ${atMediaUp[layoutBreakpoint](css`
    padding-left: ${spaceXl};
    padding-right: ${spaceXl};
  `)};
`;

export const appWrapper = css`
  height: 100%;
`;

export const sidebar = css`
  height: 100%;
`;

// TODO: replace animation duration/easing with design tokens
// once design has agreed on animation
export const sidebarAnimator = css`
  height: 100%;
  overflow: hidden;
  transition: width 150ms ease-in-out;
`;

export const sidebarItemHeight = css`
  ${padding("top", "s")};
  ${padding("bottom", "s")};
`;

export const sidebarSectionHeader = css`
  text-transform: capitalize;
`;

export const sidebarSectionList = css`
  margin: 0;
`;

export const sidebarNavItem = (isActive?: boolean) => css`
  background-color: ${isActive ? purple : "transparent"};
  cursor: pointer;
  text-transform: capitalize;

  &:hover,
  &:focus {
    background-color: ${isActive ? purple : greyDarkLighten2};
  }
`;

export const sidebarNavItemIconWrap = css`
  line-height: 0;
`;

export const subMenuItem = css`
  ${padding("top", "xs")};
  ${padding("bottom", "xs")};
`;

export const subMenuItemText = css`
  text-transform: capitalize;

  .menuHasIcon & {
    padding-left: ${parseInt(iconSize, 10) + parseInt(spaceM, 10)}px;
  }
`;

export const spaceMenuIcon = (iconWidth: string) => css`
  .${subMenuItemText} {
    padding-left: ${parseInt(iconWidth, 10) + parseInt(spaceM, 10)}px;
  }
`;
