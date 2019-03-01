import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";

import {
  flex,
  flexItem,
  padding,
  visuallyHidden,
  display,
  tintContent,
  tintContentSecondary
} from "../../shared/styles/styleUtils";
import { error, success } from "../../design-tokens/build/js/designTokens";
import { CheckboxInputProps } from "../../checkboxInput/components/CheckboxInput";
import { InputAppearance } from "../../shared/types/inputAppearance";

export interface ToggleInputProps extends React.HTMLProps<HTMLInputElement> {
  /**
   * Sets the current appearance of the input component. This defaults to InputAppearance.Standard, but supports `InputAppearance.Error` & `InputAppearance.Success` appearances as well.
   */
  appearance: InputAppearance;
  /**
   * Whether or not the input is checked
   */
  checked?: boolean;
  /**
   * Unique identifier used for the input element
   */
  id: string;
  /**
   * The text or node content that appears next to the input
   */
  inputLabel: React.ReactNode | string;
  /**
   * Defaults to `true`, but can be set to `false` to visibly hide the content passed to `inputLabel`. The `inputLabel` should still be set even when hidden for accessibility support.
   */
  showInputLabel?: boolean;
  /**
   * The value of the input
   */
  value: string;
  /**
   * How the text content vertically aligns with the input
   */
  vertAlign?: "center" | "top";
}

interface LocalToggleInputProps extends ToggleInputProps {
  children: React.ReactElement<CheckboxInputProps>; // TODO: accept radio and toggle switch components when we have them
}

class ToggleInput extends React.PureComponent<LocalToggleInputProps, {}> {
  public static defaultProps: Partial<LocalToggleInputProps> = {
    showInputLabel: true,
    vertAlign: "center"
  };

  public render() {
    const {
      appearance,
      children,
      disabled,
      id,
      inputLabel,
      showInputLabel,
      vertAlign
    } = this.props;

    return (
      <div>
        <label
          className={cx(
            flex({
              align: vertAlign === "top" ? "flex-start" : "center"
            }),
            display("inline-flex")
          )}
          htmlFor={id}
        >
          <div className={cx(flexItem("shrink"), display("inherit"))}>
            {children}
          </div>
          <div
            className={cx(flexItem("grow"), padding("left", "s"), {
              [visuallyHidden]: !showInputLabel,
              [tintContent(error)]: appearance === InputAppearance.Error,
              [tintContent(success)]: appearance === InputAppearance.Success,
              [tintContentSecondary]: disabled
            })}
          >
            {inputLabel}
          </div>
        </label>
      </div>
    );
  }
}

export default ToggleInput;
