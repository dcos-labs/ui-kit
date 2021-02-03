import Card, { CardProps } from "./Card";
import {
  buttonCard,
  buttonCardActive,
  buttonCardDisabled,
  buttonCardDisabledActive,
  buttonCardFocused,
  buttonCardFocusedActive
} from "../style";
import { cx } from "@emotion/css";

export interface ButtonCardProps extends CardProps {
  /**
   * Whether the component should look and act like a disabled element
   */
  disabled?: boolean;
  /**
   * Whether the component is in the "on" state
   */
  isActive?: boolean;
  /**
   * Whether the component is controlled by a checkbox or radio input
   */
  isInput?: boolean;
  /**
   * Whether the component's child input has focus
   */
  hasFocus?: boolean;
}

class ButtonCard extends Card<ButtonCardProps, {}> {
  public render() {
    const {
      isActive,
      isInput,
      disabled,
      hasFocus,
      onClick,
      onKeyPress,
      ...other
    } = this.props;
    const tabIndex = disabled ? -1 : 0;
    // mimic native <button> keyboard behavior without using a <button>
    const keyPressClick = e => {
      if (onClick && (e.key === " " || e.key === "Enter")) {
        onClick(e);
      }
    };
    const handleKeyPress = e => {
      keyPressClick(e);
      if (onKeyPress) {
        onKeyPress(e);
      }
    };
    const buttonProps = !isInput
      ? {
          tabIndex,
          onKeyPress: handleKeyPress,
          onClick,
          role: "button",
          "aria-disabled": disabled,
          "aria-pressed": isActive
        }
      : {};
    const buttonCardProps = {
      ...{ "data-cy": "buttonCard" },
      ...buttonProps,
      ...other
    };

    return this.getCardElement(
      buttonCardProps,
      cx(buttonCard, {
        [buttonCardActive]: isActive,
        [buttonCardDisabled]: disabled,
        [buttonCardDisabledActive]: disabled && isActive,
        [buttonCardFocused]: hasFocus,
        [buttonCardFocusedActive]: hasFocus && isActive
      })
    );
  }
}

export default ButtonCard;
