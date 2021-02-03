import * as React from "react";
import { cx } from "@emotion/css";
import { Expandable } from "../../expandable";
import { SidebarItemLabelProps } from "./SidebarItemLabel";
import { sidebarNavItem, appChromeInsetContent } from "../style";
import { listReset } from "../../shared/styles/styleUtils";
import { useTheme, ThemeProvider } from "@emotion/react";
import { AppChromeTheme } from "../types";
import { IconSize } from "../../shared/types/iconSize";

export interface SidebarSubMenuProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  label: React.ReactElement<SidebarItemLabelProps>;
  menuHasIcon?: boolean;
  iconWidth?: IconSize;
  theme?: AppChromeTheme;
  disabled?: boolean;
}

export const getSubItemList = (items: React.ReactNode[] | React.ReactNode) => (
  <ul className={listReset}>
    {React.Children.toArray(items).map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export const SidebarSubMenuComponent: React.FC<SidebarSubMenuProps> = ({
  children,
  label,
  isOpen,
  disabled,
  menuHasIcon
}) => {
  const theme = useTheme() as AppChromeTheme;

  const dataCy = [
    "sidebarSubMenu",
    ...(isOpen ? ["sidebarSubMenu.open"] : [])
  ].join(" ");

  const adjustedTheme = ancestorTheme => {
    return {
      menuHasIcon,
      ...ancestorTheme
    };
  };

  return (
    <ThemeProvider theme={adjustedTheme}>
      <li data-cy={dataCy}>
        <Expandable
          labelClassName={cx(
            appChromeInsetContent(theme && theme.sidebarItemPaddingHor),
            sidebarNavItem(false, Boolean(disabled), theme)
          )}
          isOpen={isOpen}
          controlledIsOpen={
            disabled !== undefined && disabled === true ? false : undefined
          }
          label={<div>{label}</div>}
          indicatorPosition="right"
        >
          <ul className={listReset}>
            {React.Children.toArray(children).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Expandable>
      </li>
    </ThemeProvider>
  );
};

export default SidebarSubMenuComponent;
