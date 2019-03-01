import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import FocusStyleManager from "../../shared/components/FocusStyleManager";
import {
  buttonReset,
  textWeight,
  flex,
  flexItem,
  display,
  padding
} from "../../shared/styles/styleUtils";
import {
  button,
  buttonBase,
  buttonInverse,
  fullWidthButton,
  focusStyleByAppearance,
  getInverseMutedButtonStyles,
  getMutedButtonStyles,
  processingTextStyle
} from "../style";

export enum ButtonAppearances {
  Primary = "primary",
  Secondary = "secondary",
  Standard = "standard",
  Danger = "danger",
  Success = "success"
}

export interface ButtonProps {
  /**
   * if the button triggers new content to appear (e.g.: modals and dropdowns)
   */
  ariaHaspopup?: boolean;
  children?: React.ReactNode | string;
  /**
   * whether or not the button is enabled
   */
  disabled?: boolean;
  /**
   * the icon that appears before the button text
   */
  iconStart?: React.ReactElement<HTMLElement>;
  /**
   * the icon that appears after the button text
   */
  iconEnd?: React.ReactElement<HTMLElement>;
  /**
   * whether the action the button was meant to do has completed
   */
  isProcessing?: boolean;
  /**
   * if the button should fill the width of it's container
   */
  isFullWidth?: boolean;
  /**
   * if the button is on a dark background
   */
  isInverse?: boolean;
  /**
   * the function the button calls
   */
  onClick?: (e?: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * the type of button - same as HTML "type" attribute on the <button> tag
   */
  type?: "button" | "reset" | "submit";
}

export interface ButtonBaseProps extends ButtonProps {
  appearance: ButtonAppearances;
  className?: string;
}

class ButtonBase extends React.PureComponent<ButtonBaseProps, {}> {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.buttonContentWithIcons = this.buttonContentWithIcons.bind(this);
  }

  public render() {
    const {
      appearance,
      children,
      className,
      disabled,
      iconStart,
      iconEnd,
      isInverse,
      isProcessing,
      isFullWidth,
      onClick,
      ...other
    } = this.props;

    return (
      <FocusStyleManager
        focusEnabledClass={focusStyleByAppearance(appearance, isInverse)}
      >
        <button
          className={cx(
            buttonReset,
            button[appearance],
            buttonBase,
            textWeight("medium"),
            className,
            {
              [fullWidthButton]: isFullWidth,
              [buttonInverse[appearance]]: isInverse,
              [getMutedButtonStyles(appearance)]: disabled || isProcessing,
              [getInverseMutedButtonStyles(appearance)]:
                (disabled || isProcessing) && isInverse
            }
          )}
          disabled={disabled || isProcessing}
          onClick={this.onClick}
          tabIndex={0}
          {...other}
        >
          {Boolean(iconStart) || Boolean(iconEnd) ? (
            this.buttonContentWithIcons()
          ) : (
            <span className={isProcessing ? processingTextStyle : ""}>
              {children}
            </span>
          )}
        </button>
      </FocusStyleManager>
    );
  }

  private onClick(e: React.SyntheticEvent<HTMLElement>) {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(e);
    }
  }

  private getIconStart(icon?: React.ReactElement<HTMLElement>) {
    return (
      Boolean(icon) && (
        <span className={cx(flexItem("shrink"), display("inherit"))}>
          {icon}
        </span>
      )
    );
  }

  private getIconEnd(icon?: React.ReactElement<HTMLElement>) {
    return (
      Boolean(icon) && (
        <span
          className={cx(
            flexItem("shrink"),
            display("inherit"),
            padding("left", "xxs")
          )}
        >
          {icon}
        </span>
      )
    );
  }

  private buttonContentWithIcons() {
    const { iconStart, iconEnd, isProcessing, children } = this.props;
    return (
      <span className={flex({ align: "center", justify: "center" })}>
        {this.getIconStart(iconStart)}
        {Boolean(children) && (
          <span
            className={cx(flexItem("shrink"), padding("left", "xs"), {
              [processingTextStyle]: isProcessing
            })}
          >
            {children}
          </span>
        )}
        {this.getIconEnd(iconEnd)}
      </span>
    );
  }
}

export default ButtonBase;
