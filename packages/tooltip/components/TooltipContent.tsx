import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import { tooltip, getTooltipArrow } from "../style";
import { darkMode, padding } from "../../shared/styles/styleUtils";
import { BaseTooltipProps } from "./Tooltip";
import { Direction } from "../../dropdownable/components/Dropdownable";

export interface TooltipContentProps extends BaseTooltipProps {
  direction?: Direction;
  open: boolean;
}

class TooltipContent extends React.PureComponent<TooltipContentProps, {}> {
  public render() {
    const {
      direction = Direction.TopCenter,
      children,
      id,
      maxWidth,
      minWidth,
      open
    } = this.props;

    return (
      <div
        aria-hidden={!open}
        id={id}
        className={cx(
          tooltip,
          getTooltipArrow(direction),
          darkMode,
          padding("horiz", "s"),
          padding("vert", "xs")
        )}
        role="tooltip"
        style={{
          minWidth,
          maxWidth
        }}
      >
        {children}
      </div>
    );
  }
}

export default TooltipContent;
