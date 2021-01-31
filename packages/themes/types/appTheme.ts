import { AppChromeTheme } from "../../appChrome/types";

type Color = React.CSSProperties["color"];
export type LocalTheme = AppChromeTheme & {
  menuHasIcon: boolean;

  coloredRows: any[];
  mutedRows: any[];

  colors: {
    // Branding
    brandPrimary?: Color;
    brandPrimaryInverted?: Color;
    brandSecondary?: Color;
    brandSecondaryInverted?: Color;

    // States
    success?: Color;
    successInverted?: Color;
    warning?: Color;
    warningInverted?: Color;
    error?: Color;
    errorInverted?: Color;

    // Backgrounds
    bgPrimary?: Color;
    bgPrimaryInverted?: Color;
    bgSecondary?: Color;
    bgSecondaryInverted?: Color;
    bgHover?: Color;
    bgHoverInverted?: Color;
    bgScrim?: Color;
    bgSelected?: Color;
    bgSelectedInverted?: Color;
    bgAppHeader?: Color;

    // Text
    textColorPrimary?: Color;
    textColorPrimaryInverted?: Color;
    textColorSecondary?: Color;
    textColorSecondaryInverted?: Color;
    textColorInteractive?: Color;
    textColorInteractiveInverted?: Color;

    // Decorators
    border?: Color;
    borderInverted?: Color;
    borderHeavy?: Color;
    borderHeavyInverted?: Color;
    shadow?: Color;
    shadowInverted?: Color;
  };
};

declare module "@emotion/react" {
  export interface Theme extends LocalTheme {
    _unused: true; // can not be empty
  }
}
