import * as React from "react";
import { useTheme } from "@emotion/react";
import { sidebarNavItem } from "../style";
import Clickable from "../../clickable/components/clickable";
import ResetLink from "../../link/components/ResetLink";
import { AppChromeTheme, SidebarNavItemProps } from "../types";
import { display } from "../../shared/styles/styleUtils";

export interface SidebarItemProps extends SidebarNavItemProps {
  icon?: React.ReactElement<HTMLElement> | string;
  theme?: AppChromeTheme;
}

export const defaultSidebarItemHorizPaddingSize = "l";
export const defaultSidebarItemVertPaddingSize = "none";

const SidebarItemComponent: React.FC<SidebarItemProps> = ({
  children,
  disabled,
  isActive,
  onClick,
  openInNewTab,
  url
}) => {
  const theme: AppChromeTheme = useTheme();
  const dataCy = [
    "sidebarItem",
    ...(isActive ? ["sidebarItem.active"] : [])
  ].join(" ");

  return (
    <>
      {url ? (
        <li
          data-cy={dataCy}
          className={sidebarNavItem(
            Boolean(isActive),
            Boolean(disabled),
            theme
          )}
        >
          <ResetLink
            url={!disabled ? url : undefined}
            openInNewTab={openInNewTab}
            onClick={onClick}
            className={display("block")}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : undefined}
          >
            {children}
          </ResetLink>
        </li>
      ) : (
        <Clickable
          action={onClick}
          tabIndex={0}
          disableFocusOutline={true}
          data-cy={dataCy}
        >
          <li
            className={sidebarNavItem(
              Boolean(isActive),
              Boolean(disabled),
              theme
            )}
          >
            {children}
          </li>
        </Clickable>
      )}
    </>
  );
};

export default SidebarItemComponent;
