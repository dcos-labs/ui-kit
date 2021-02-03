import * as React from "react";
import { cx } from "@emotion/css";
import { ThemeProvider, useTheme } from "@emotion/react";
import { sidebar, sidebarAnimator, sidebarContainer } from "../style";
import { themeBgPrimaryInverted } from "../../design-tokens/build/js/designTokens";
import getCSSVarValue from "../../utilities/getCSSVarValue";
import { getResponsiveStyle } from "../../shared/styles/styleUtils";
import { AppChromeTheme } from "../types";
export interface SidebarProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const defaultSidebarWidths = {
  default: "240px",
  large: "280px"
};

const StyledSidebar: React.FC<{ isOpen?: boolean }> = ({
  children,
  isOpen
}) => {
  const theme = useTheme() as AppChromeTheme;

  return (
    <div
      className={cx(
        sidebarContainer(theme, isOpen),
        getResponsiveStyle("width", isOpen ? theme.sidebarWidth : 0),
        sidebarAnimator
      )}
    >
      <nav
        className={cx(
          getResponsiveStyle("min-width", theme.sidebarWidth),
          sidebar
        )}
      >
        {children}
      </nav>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen,
  onClose,
  onOpen
}) => {
  // Used to only call `onOpen`/`onClose` when the `isOpen` prop changes.
  // Source: https://dev.to/savagepixie/how-to-mimic-componentdidupdate-with-react-hooks-3j8c
  const didMountRef = React.useRef(false);
  React.useEffect(() => {
    if (didMountRef.current) {
      if (isOpen && onOpen) {
        onOpen();
      } else if (!isOpen && onClose) {
        onClose();
      }
    } else {
      didMountRef.current = true;
    }
  }, [isOpen]);

  const adjustedTheme = ancestorTheme => {
    return {
      sidebarBackgroundColor: getCSSVarValue(themeBgPrimaryInverted),
      sidebarWidth: defaultSidebarWidths,
      ...ancestorTheme
    };
  };

  return (
    <ThemeProvider theme={adjustedTheme}>
      <StyledSidebar isOpen={isOpen}>{children}</StyledSidebar>
    </ThemeProvider>
  );
};

export default Sidebar;
