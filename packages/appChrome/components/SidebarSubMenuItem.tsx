import * as React from "react";
import {
  subMenuItem,
  subMenuItemText,
  appChromeInsetContent,
  sidebarNavItem,
  spaceMenuIcon
} from "../style";
import { cx } from "@emotion/css";
import { textSize, flex, tintContent } from "../../shared/styles/styleUtils";
import Clickable from "../../clickable/components/clickable";
import ResetLink from "../../link/components/ResetLink";
import { useTheme } from "@emotion/react";
import getCSSVarValue from "../../utilities/getCSSVarValue";
import {
  themeTextColorPrimary,
  themeTextColorPrimaryInverted,
  themeTextColorSecondaryInverted,
  themeBgPrimaryInverted,
  themeBgSelected
} from "../../design-tokens/build/js/designTokens";
import { pickReadableTextColor } from "../../shared/styles/color";
import { AppChromeTheme, SidebarNavItemProps } from "../types";
import { IconSize } from "../../shared/types/iconSize";

const SidebarSubMenuItemText: React.FC<{
  menuHasIcon: boolean;
  iconContainerWidth: IconSize;
}> = ({ children, menuHasIcon, iconContainerWidth }) => (
  <span
    className={cx(subMenuItemText, {
      [spaceMenuIcon(iconContainerWidth)]: menuHasIcon
    })}
  >
    {children}
  </span>
);

const SidebarSubMenuItem: React.FC<SidebarNavItemProps> = ({
  children,
  disabled,
  isActive,
  onClick,
  openInNewTab,
  url
}) => {
  const theme = useTheme() as AppChromeTheme & { menuHasIcon: boolean };
  const iconContainerWidth = theme.iconWidth || "s";
  const sidebarBgColor = theme?.sidebarBackgroundColor
    ? theme.sidebarBackgroundColor
    : getCSSVarValue(themeBgPrimaryInverted);
  const activeBgColor = theme?.itemActiveBackgroundColor;
  const subMenuItemBgColor = isActive
    ? activeBgColor || themeBgSelected
    : sidebarBgColor;
  const classNames = cx(
    appChromeInsetContent(theme?.sidebarItemPaddingHor),
    sidebarNavItem(Boolean(isActive), Boolean(disabled), theme),
    tintContent(
      pickReadableTextColor(
        sidebarBgColor,
        getCSSVarValue(themeTextColorPrimary),
        getCSSVarValue(themeTextColorSecondaryInverted)
      )
    ),
    textSize("s"),
    flex({ align: "center" }),
    subMenuItem,
    {
      [tintContent(
        pickReadableTextColor(
          subMenuItemBgColor,
          getCSSVarValue(themeTextColorPrimary),
          getCSSVarValue(themeTextColorPrimaryInverted)
        )
      )]: isActive
    }
  );
  const dataCy = [
    "sidebarSubMenuItem",
    ...(isActive ? ["sidebarSubMenuItem.active"] : [])
  ].join(" ");

  return url ? (
    <ResetLink
      url={url}
      openInNewTab={openInNewTab}
      className={classNames}
      onClick={onClick}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      data-cy={dataCy}
    >
      <SidebarSubMenuItemText
        iconContainerWidth={iconContainerWidth}
        menuHasIcon={theme.menuHasIcon}
      >
        {children}
      </SidebarSubMenuItemText>
    </ResetLink>
  ) : (
    <Clickable
      action={onClick}
      tabIndex={0}
      data-cy={dataCy}
      disableFocusOutline={true}
    >
      <div className={classNames}>
        <SidebarSubMenuItemText
          iconContainerWidth={iconContainerWidth}
          menuHasIcon={theme.menuHasIcon}
        >
          {children}
        </SidebarSubMenuItemText>
      </div>
    </Clickable>
  );
};

export default SidebarSubMenuItem;
