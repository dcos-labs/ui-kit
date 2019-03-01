import * as React from "react";
import { jsx } from "@emotion/core";
import Dropdownable, {
  Direction
} from "../../dropdownable/components/Dropdownable";
import TooltipContent from "./TooltipContent";

export interface BaseTooltipProps {
  children: React.ReactNode | string;
  id: string;
  maxWidth?: number;
  minWidth?: number;
}
export interface TooltipProps extends BaseTooltipProps {
  ariaLabel?: string;
  preferredDirections?: Direction[];
  open?: boolean;
  suppress?: boolean;
  trigger: React.ReactNode;
}

export interface TooltipState {
  open: boolean;
}

class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open || false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  public render() {
    const {
      ariaLabel,
      children,
      id,
      maxWidth,
      minWidth,
      preferredDirections,
      trigger
    } = this.props;

    return (
      <span
        aria-label={ariaLabel}
        aria-describedby={id}
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        onFocus={this.handleOpen}
        onBlur={this.handleClose}
        tabIndex={0}
      >
        <Dropdownable
          open={this.state.open}
          dropdown={
            <TooltipContent
              id={id}
              open={this.state.open}
              minWidth={minWidth}
              maxWidth={maxWidth}
            >
              {children}
            </TooltipContent>
          }
          preferredDirections={
            preferredDirections || [Direction.TopCenter, Direction.BottomCenter]
          }
        >
          {trigger}
        </Dropdownable>
      </span>
    );
  }

  private handleOpen() {
    if (this.props.suppress) {
      return;
    }
    this.setState({ open: true });
  }

  private handleClose() {
    if (this.props.suppress) {
      return;
    }

    this.setState({ open: false });
  }
}

export default Tooltip;
