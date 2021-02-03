import * as React from "react";
import { Tabs as ReactTabs, TabList, TabPanel } from "react-tabs";
import { injectGlobal, cx } from "@emotion/css";

import { TabItemProps } from "./TabItem";
import { TabTitle } from "..";
import {
  fontWeightMedium,
  themeTextColorPrimary,
  themeBrandPrimary,
  themeBgHover
} from "../../design-tokens/build/js/designTokens";
import { listReset } from "../../shared/styles/styleUtils";
import { BreakpointConfig } from "../../shared/styles/breakpoints";
import { fullHeightTabs, getTabLayout } from "../style";

export const defaultTabDirection = "horiz";

// Copy & paste from node_modules/react-tabs/style/react-tabs.css
// Also changed to better fit the ui kit styles.
// This is needed to give the tabs a style
/* tslint:disable */
injectGlobal`
.react-tabs {
  -webkit-tap-highlight-color: transparent;
}

.react-tabs__tab-list {
  ${listReset};
}

.react-tabs__tab {
  position: relative;
  cursor: pointer;
  font-weight: ${fontWeightMedium};
  color: ${themeTextColorPrimary};
  &:after{
    content: "";
    position: absolute;
    background: ${themeBrandPrimary};
    display:none;
  }
}

.react-tabs__tab:focus {
  outline: none;
  background: ${themeBgHover}
}

.react-tabs__tab--selected {
  &:after{
    display: block;
  }
  color: ${themeBrandPrimary};
}

.react-tabs__tab--disabled {
  color: GrayText;
  cursor: default;
}

.react-tabs__tab-panel {
  display: none;
  flex-grow: 1;
}

.react-tabs__tab-panel--selected {
  display: block;
}
`;
/* tslint:enable */

export type TabDirections = "horiz" | "vert";
export type TabDirection = BreakpointConfig<TabDirections>;
export type TabSelected = string;
export interface TabsProps {
  children: Array<React.ReactElement<TabItemProps>>;
  selectedIndex: number;
  onSelect: (tabIndex: number) => void;
  direction?: TabDirection;
}

class Tabs extends React.PureComponent<TabsProps, {}> {
  public render() {
    const {
      children,
      selectedIndex,
      onSelect,
      direction = defaultTabDirection
    } = this.props;

    const { tabs, tabsContent } = React.Children.toArray(children)
      .filter(item => React.isValidElement<TabItemProps>(item))
      .reduce<{
        tabs: React.ReactNodeArray;
        tabsContent: React.ReactNodeArray;
      }>(
        (acc, item) => {
          const { tabs = [], tabsContent = [] } = acc;
          const { children } = item.props;
          const key = item.key ? item.key : undefined;
          const childrenWithKeys = React.Children.toArray(children).map(child =>
            React.isValidElement<TabTitle>(child)
              ? React.cloneElement(child, { key })
              : child
          );

          const title = childrenWithKeys.find(
            child =>
              React.isValidElement<TabTitle>(child) && child.type === TabTitle
          );
          const tabChildren = childrenWithKeys.filter(
            child => !(React.isValidElement(child) && child.type === TabTitle)
          );
          return {
            tabs: [...tabs, title],
            tabsContent: [
              ...tabsContent,
              ...(tabChildren.length
                ? [<TabPanel key={key}>{tabChildren}</TabPanel>]
                : [])
            ]
          };
        },
        { tabs: [], tabsContent: [] }
      );

    return (
      <ReactTabs
        className={cx("react-tabs", {
          [fullHeightTabs]: Boolean(tabsContent.length),
          [getTabLayout(direction)]: Boolean(direction)
        })}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
        data-cy="tabs"
      >
        <TabList>{tabs}</TabList>
        {tabsContent}
      </ReactTabs>
    );
  }
}

export default Tabs;
