import { css } from "@emotion/css";
import {
  spaceM,
  themeBgAppHeader,
  themeBgSelected,
  themeBgHover,
  themeBgHoverInverted,
  themeTextColorPrimary,
  themeTextColorPrimaryInverted,
  themeBgPrimaryInverted
} from "../design-tokens/build/js/designTokens";
import { padding, tintContent } from "../shared/styles/styleUtils";
import { pickHoverBg, pickReadableTextColor } from "../shared/styles/color";
import getCSSVarValue from "../utilities/getCSSVarValue";
import { AppChromeTheme } from "./types";
import {
  spaceSizes,
  SpaceSizes
} from "../shared/styles/styleUtils/modifiers/modifierUtils";
import {
  defaultSidebarItemHorizPaddingSize,
  defaultSidebarItemVertPaddingSize
} from "./components/SidebarItem";
import { IconSize } from "../shared/types/iconSize";
import { iconSizes } from "../shared/styles/styleUtils/layout/iconSizes";

export const appChrome = css`
  height: 100%;
  overflow: hidden;
`;

export const appChromeInsetContent = (horizPadding?: SpaceSizes) => css`
  padding-left: ${horizPadding
    ? spaceSizes[horizPadding]
    : spaceSizes[defaultSidebarItemHorizPaddingSize]};
  padding-right: ${horizPadding
    ? spaceSizes[horizPadding]
    : spaceSizes[defaultSidebarItemHorizPaddingSize]};
`;

export const appWrapper = css`
  height: 100%;
  overflow: auto;
`;

export const headerBar = (theme: AppChromeTheme) => {
  const bgColor =
    theme.headerBackgroundColor || getCSSVarValue(themeBgAppHeader);
  const textColor = pickReadableTextColor(
    bgColor,
    getCSSVarValue(themeTextColorPrimary),
    getCSSVarValue(themeTextColorPrimaryInverted)
  );
  return css`
    background-color: ${bgColor};
    padding-left: ${theme.headerPaddingHor
      ? spaceSizes[theme.headerPaddingHor]
      : spaceSizes.l};
    padding-right: ${theme.headerPaddingHor
      ? spaceSizes[theme.headerPaddingHor]
      : spaceSizes.l};
    padding-bottom: ${theme.headerPaddingVert
      ? spaceSizes[theme.headerPaddingVert]
      : spaceSizes.xs};
    padding-top: ${theme.headerPaddingVert
      ? spaceSizes[theme.headerPaddingVert]
      : spaceSizes.xs};
    ${tintContent(textColor)};
  `;
};

export const sidebar = css`
  height: 100%;
`;

export const sidebarContainer = (theme: AppChromeTheme, isOpen?: boolean) => {
  const bgColor =
    theme.sidebarBackgroundColor || getCSSVarValue(themeBgPrimaryInverted);
  const textColor = pickReadableTextColor(
    bgColor,
    getCSSVarValue(themeTextColorPrimary),
    getCSSVarValue(themeTextColorPrimaryInverted)
  );

  return css`
    background-color: ${bgColor};
    transform: ${`translateX(${isOpen ? 0 : "-100%"})`};
    ${tintContent(textColor)};
  `;
};

// TODO: replace animation duration/easing with design tokens
// once design has agreed on animation
export const sidebarAnimator = css`
  height: 100%;
  overflow-x: hidden;
  transition: width 150ms ease-in-out, transform 150ms ease-in-out;
`;

export const sidebarItemHeight = css`
  ${padding("top", "s")};
  ${padding("bottom", "s")};
`;

export const sidebarSectionHeader = (theme: AppChromeTheme) => css`
  text-transform: capitalize;
  padding-left: ${theme.sidebarHeaderPaddingHor
    ? spaceSizes[theme.sidebarHeaderPaddingHor]
    : spaceSizes.l};
  padding-right: ${theme.sidebarHeaderPaddingHor
    ? spaceSizes[theme.sidebarHeaderPaddingHor]
    : spaceSizes.l};
  padding-bottom: ${theme.sidebarHeaderPaddingVert
    ? spaceSizes[theme.sidebarHeaderPaddingVert]
    : spaceSizes.s};
  padding-top: ${theme.sidebarHeaderPaddingVert
    ? spaceSizes[theme.sidebarHeaderPaddingVert]
    : spaceSizes.s};
`;

export const sidebarSectionList = css`
  margin: 0;
`;

export const sidebarNavItem = (
  isActive: boolean,
  isDisabled?: boolean,
  theme?: AppChromeTheme
) => {
  const activeBgColor = theme && theme.itemActiveBackgroundColor;
  const hoverBgColor = theme && theme.itemHoverBackgroundColor;
  const sidebarBgColor = theme && theme.sidebarBackgroundColor;
  const itemBgColor =
    isActive && !isDisabled ? activeBgColor || themeBgSelected : sidebarBgColor;

  return css`
    background-color: ${itemBgColor};
    color: ${isActive
      ? pickReadableTextColor(
          itemBgColor,
          getCSSVarValue(themeTextColorPrimary),
          getCSSVarValue(themeTextColorPrimaryInverted)
        )
      : null};
    cursor: ${isDisabled ? "default !important" : "pointer"};
    opacity: ${isDisabled ? "0.6" : "1"};
    text-transform: capitalize;
    padding: ${spaceSizes[
        theme?.sidebarItemPaddingVert || defaultSidebarItemVertPaddingSize
      ]}
      ${spaceSizes[
        theme?.sidebarItemPaddingHor || defaultSidebarItemHorizPaddingSize
      ]};

    * {
      cursor: ${isDisabled ? "default !important" : "unset"};
    }

    &:hover,
    &:focus,
    &:focus-within {
      background-color: ${isActive || isDisabled
        ? itemBgColor
        : pickHoverBg(
            sidebarBgColor,
            hoverBgColor || getCSSVarValue(themeBgHover),
            hoverBgColor || getCSSVarValue(themeBgHoverInverted)
          )};

      &,
      a {
        outline: none;
      }
    }
  `;
};

export const sidebarNavItemIconWrap = css`
  line-height: 0;
`;

export const subMenuItem = css`
  ${padding("top", "xs")};
  ${padding("bottom", "xs")};
`;

export const subMenuItemText = css`
  text-transform: capitalize;
`;

export const spaceMenuIcon = (iconWidth: IconSize) => css`
  padding-left: ${parseInt(iconSizes[iconWidth], 10) + parseInt(spaceM, 10)}px;
`;
