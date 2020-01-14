import * as React from "react";
import { css } from "emotion";
import styled from "react-emotion";
import { ThemeProvider } from "emotion-theming";
import { sidebar, sidebarAnimator } from "../style";
import {
  themeTextColorPrimary,
  themeTextColorPrimaryInverted,
  themeBgPrimaryInverted
} from "../../design-tokens/build/js/designTokens";
import getCSSVarValue from "../../utilities/getCSSVarValue";
import { pickReadableTextColor } from "../../shared/styles/color";
import {
  tintContent,
  getResponsiveStyle
} from "../../shared/styles/styleUtils";
export interface SidebarProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const defaultSidebarWidths = {
  default: "240px",
  large: "280px"
};

const StyledSidebar = styled("div")`
  ${props => {
    const bgColor =
      props.theme.sidebarBackgroundColor ||
      getCSSVarValue(themeBgPrimaryInverted);
    const textColor = pickReadableTextColor(
      bgColor,
      getCSSVarValue(themeTextColorPrimary),
      getCSSVarValue(themeTextColorPrimaryInverted)
    );
    return css`
      background-color: ${bgColor};
      transform: ${`translateX(${props.theme.isOpen ? 0 : "-100%"})`};
      ${tintContent(textColor)};
      ${getResponsiveStyle(
        "width",
        props.theme.isOpen ? props.theme.sidebarWidth : 0
      )};
    `;
  }};
`;

const StyledNav = styled("nav")`
  ${props => getResponsiveStyle("min-width", props.theme.sidebarWidth)};
`;

class Sidebar extends React.PureComponent<SidebarProps, {}> {
  public componentDidUpdate(prevProps: SidebarProps) {
    const { onOpen, onClose } = this.props;

    if (prevProps.isOpen && onOpen) {
      onOpen();
    } else if (!prevProps.isOpen && onClose) {
      onClose();
    }
  }

  public render() {
    const { children, isOpen } = this.props;

    const adjustedTheme = ancestorTheme => {
      return {
        sidebarBackgroundColor: getCSSVarValue(themeBgPrimaryInverted),
        sidebarWidth: defaultSidebarWidths,
        isOpen,
        ...ancestorTheme
      };
    };

    return (
      <ThemeProvider theme={adjustedTheme}>
        <StyledSidebar className={sidebarAnimator}>
          <StyledNav className={sidebar}>{children}</StyledNav>
        </StyledSidebar>
      </ThemeProvider>
    );
  }
}

export default Sidebar;
