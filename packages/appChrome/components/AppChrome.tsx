import * as React from "react";
import { jsx } from "@emotion/core";
import { appChrome, appWrapper } from "../style";
import {
  flex,
  flexItem,
  textSize,
  flush
} from "../../shared/styles/styleUtils";

export interface AppChromeProps {
  sidebar: React.ReactNode;
  headerBar: React.ReactNode;
  mainContent: React.ReactNode;
}

class AppChrome extends React.PureComponent<AppChromeProps, {}> {
  public render() {
    const { sidebar, headerBar, mainContent } = this.props;

    return (
      <div css={[appChrome, textSize("m"), flex({ direction: "column" })]}>
        <div className="headerBar">{headerBar}</div>
        <div css={[flex(), appWrapper]}>
          <div css={[flexItem("shrink")]}>{sidebar}</div>
          <main css={[flexItem("grow"), flush("left")]}>{mainContent}</main>
        </div>
      </div>
    );
  }
}

export default AppChrome;
