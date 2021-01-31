import * as React from "react";
import { cx } from "@emotion/css";
import { appChrome, appWrapper } from "../style";
import {
  flex,
  flexItem,
  textSize,
  flush
} from "../../shared/styles/styleUtils";
import { ThemeProvider } from "@emotion/react";
import getCSSVarValue from "../../utilities/getCSSVarValue";
import { themeBgPrimaryInverted } from "../../design-tokens/build/js/designTokens";
import {
  defaultSidebarItemHorizPaddingSize,
  defaultSidebarItemVertPaddingSize
} from "./SidebarItem";

export interface AppChromeProps {
  sidebar: React.ReactNode;
  headerBar: React.ReactNode;
  mainContent: React.ReactNode;
}

class AppChrome extends React.PureComponent<AppChromeProps, {}> {
  public render() {
    const { sidebar, headerBar, mainContent } = this.props;

    return (
      <ThemeProvider
        theme={{
          sidebarBackgroundColor: getCSSVarValue(themeBgPrimaryInverted),
          sidebarItemPaddingHor: defaultSidebarItemHorizPaddingSize,
          sidebarItemPaddingVert: defaultSidebarItemVertPaddingSize
        }}
      >
        <div
          className={cx(
            appChrome,
            textSize("m"),
            flex({ direction: "column" })
          )}
          data-cy="appChrome"
        >
          <div data-cy="headerBar">{headerBar}</div>
          <div className={cx(flex(), appWrapper)}>
            <div className={flexItem("shrink")} data-cy="sidebar">
              {sidebar}
            </div>
            <main
              className={cx(flexItem("grow"), flush("left"), appWrapper)}
              data-cy="main"
            >
              {mainContent}
            </main>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default AppChrome;
