import * as React from "react";
import { jsx } from "@emotion/core";
import { cx, css } from "emotion";
import styled from "@emotion/styled";
import { darkMode } from "../../shared/styles/styleUtils";
import { sidebar, sidebarAnimator } from "../style";
import { greyDark } from "../../design-tokens/build/js/designTokens";
import { atMediaUp } from "../../shared/styles/breakpoints";
import { isHexDark } from "../../shared/styles/color";

export interface SidebarProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const sidebarWidths = {
  default: "240px",
  large: "280px"
};
const layoutBreakpoint = "large";

const sidebarWidth = css`
  width: ${sidebarWidths.default};

  ${atMediaUp[layoutBreakpoint](css`
    width: ${sidebarWidths[layoutBreakpoint]};
  `)};
`;

const sidebarAnimatorWidth = (isOpen: boolean) => css`
  width: ${isOpen ? sidebarWidths.default : 0};

  ${atMediaUp[layoutBreakpoint](css`
    width: ${isOpen ? sidebarWidths[layoutBreakpoint] : 0};
  `)};
`;

class Sidebar extends React.PureComponent<SidebarProps, {}> {
  public componentWillReceiveProps(nextProps: SidebarProps) {
    const { onOpen, onClose } = this.props;

    if (nextProps.isOpen && onOpen) {
      onOpen();
    } else if (!nextProps.isOpen && onClose) {
      onClose();
    }
  }

  public render() {
    const { children, isOpen } = this.props;
    const navClassNames = [sidebar, sidebarWidth];
    const divClassNames = [sidebarAnimator];

    const Sidebar = styled("div")`
      background-color: ${props =>
        props.theme.sidebarBackgroundColor || greyDark};
      ${props =>
        props.theme.sidebarWidth
          ? "width: " + props.theme.sidebarWidth
          : sidebarAnimatorWidth(isOpen)};
    `;

    const Nav = styled("nav")`
      ${props =>
        props.theme.sidebarWidth
          ? "width: " + props.theme.sidebarWidth
          : sidebarWidth};
      ${props =>
        !props.theme.sidebarBackgroundColor ||
        (props.theme.sidebarBackgroundColor &&
          isHexDark(props.theme.sidebarBackgroundColor))
          ? darkMode
          : null};
    `;

    return (
      <Sidebar css={divClassNames}>
        <Nav css={navClassNames}>{children}</Nav>
      </Sidebar>
    );
  }
}

export default Sidebar;
