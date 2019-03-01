import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import { Expandable } from "../../expandable";
import { SidebarItemLabelProps } from "./SidebarItemLabel";
import { SidebarSubMenuItemProps } from "./SidebarSubMenuItem";
import { sidebarNavItem, appChromeInsetContent, spaceMenuIcon } from "../style";
import { listReset } from "../../shared/styles/styleUtils";
export interface SidebarSubMenuProps {
  children: Array<React.ReactElement<SidebarSubMenuItemProps>>;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  label: React.ReactElement<SidebarItemLabelProps>;
  menuHasIcon?: boolean;
  iconWidth?: string;
}

class SidebarSubMenu extends React.PureComponent<SidebarSubMenuProps, {}> {
  constructor(props) {
    super(props);

    this.getSubItemList = this.getSubItemList.bind(this);
  }

  public getSubItemList(
    items: Array<React.ReactElement<SidebarSubMenuItemProps>>
  ) {
    const iconWidth = this.props.iconWidth ? this.props.iconWidth : 0;
    return (
      <ul css={listReset}>
        {items.map((item, i) => (
          <li
            css={[Boolean(iconWidth) && spaceMenuIcon(`${iconWidth}px`)]}
            key={i}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  public render() {
    const { children, label, isOpen } = this.props;

    return (
      <li>
        <Expandable
          labelClassName={[appChromeInsetContent, sidebarNavItem(false)]}
          isOpen={isOpen}
          label={<div>{label}</div>}
        >
          {this.getSubItemList(children)}
        </Expandable>
      </li>
    );
  }
}

export default SidebarSubMenu;
