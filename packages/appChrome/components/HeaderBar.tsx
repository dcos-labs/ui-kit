import * as React from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { darkMode, flex } from "../../shared/styles/styleUtils";
import { spaceSizes } from "../../../packages/shared/styles/styleUtils/modifiers/modifierUtils";
import { purpleDarken4 } from "../../design-tokens/build/js/designTokens";
import { isHexDark } from "../../shared/styles/color";

export interface HeaderProps {
  children: React.ReactElement<HTMLElement> | string;
}

class Header extends React.PureComponent<HeaderProps, {}> {
  public render() {
    const { children } = this.props;
    /* tslint:disable:no-string-literal */
    const HeaderBar = styled.div`
      background-color: ${props =>
        props.theme.headerBackgroundColor || purpleDarken4};
      ${props =>
        !props.theme.headerBackgroundColor ||
        (props.theme.headerBackgroundColor &&
          isHexDark(props.theme.headerBackgroundColor))
          ? darkMode
          : null};
      padding-left: ${props =>
        spaceSizes[props.theme.headerPaddingHor] || spaceSizes["l"]};
      padding-right: ${props =>
        spaceSizes[props.theme.headerPaddingHor] || spaceSizes["l"]};
      padding-bottom: ${props =>
        spaceSizes[props.theme.headerPaddingVert] || spaceSizes["xs"]};
      padding-top: ${props =>
        spaceSizes[props.theme.headerPaddingVert] || spaceSizes["xs"]};
    `;
    /* tslint:enable:no-string-literal */

    return <HeaderBar css={[flex({ align: "center" })]}>{children}</HeaderBar>;
  }
}

export default Header;
