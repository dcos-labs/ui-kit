import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import { injectCustomProperties } from "../../shared/styles/global";
import { LocalTheme as Theme } from "../types/appTheme";

interface UIKitThemeProviderProps {
  appTheme: Theme;
  children: React.ReactNode;
}

export class UIKitThemeProvider extends React.PureComponent<
  UIKitThemeProviderProps,
  {}
> {
  public render() {
    const { children, appTheme } = this.props;
    injectCustomProperties(appTheme);

    return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
  }
}

export default UIKitThemeProvider;
