import * as React from "react";
import { LinkComponent } from "../../link/types";
import { LinkComponentContext } from "../link/context";
import { UIKitThemeProvider } from "../../themes";
import { LocalTheme as Theme } from "../../themes/types/appTheme";

export interface UIKitProviderProps {
  children?: React.ReactNode;
  linkComponent?: LinkComponent;
  theme?: Theme;
}

class UIKitProvider extends React.Component<UIKitProviderProps, {}> {
  public render() {
    const { children, theme, linkComponent } = this.props;

    return (
      <UIKitThemeProvider appTheme={theme || ({} as Theme)}>
        <LinkComponentContext.Provider value={linkComponent}>
          {children}
        </LinkComponentContext.Provider>
      </UIKitThemeProvider>
    );
  }
}

export default UIKitProvider;
