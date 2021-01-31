import { BreakpointConfig } from "../shared/styles/breakpoints";
import { SpaceSizes } from "../shared/styles/styleUtils/modifiers/modifierUtils";
import { LinkProps } from "../link/types";
import { IconSize } from "../shared/types/iconSize";

type BgColor = React.CSSProperties["backgroundColor"];
type PaddingHoriz = SpaceSizes;
type PaddingVert = SpaceSizes;

export interface AppChromeTheme {
  headerBackgroundColor?: BgColor;
  headerPaddingHor?: PaddingHoriz;
  headerPaddingVert?: PaddingVert;
  iconWidth?: IconSize;
  itemActiveBackgroundColor?: BgColor;
  itemHoverBackgroundColor?: BgColor;
  sidebarBackgroundColor?: BgColor;
  sidebarHeaderPaddingHor?: PaddingHoriz;
  sidebarHeaderPaddingVert?: PaddingVert;
  sidebarWidth?: BreakpointConfig<React.CSSProperties["width"]>;
  sidebarItemPaddingHor?: PaddingHoriz;
  sidebarItemPaddingVert?: PaddingVert;
}

export interface SidebarNavItemProps extends LinkProps {
  isActive?: boolean;
  onClick?: (event?: React.SyntheticEvent<HTMLElement>) => void;
  disabled?: boolean;
}
