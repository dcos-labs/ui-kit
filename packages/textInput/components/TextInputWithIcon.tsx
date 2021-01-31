import { cx } from "@emotion/css";
import * as React from "react";

import { TextInput, TextInputProps } from "./TextInput";

import {
  getInputAppearanceStyle,
  inputContainer,
  getIconAppearanceStyle,
  inputIconWrapper
} from "../../shared/styles/formStyles";
import { flex, flexItem, flush, padding } from "../../shared/styles/styleUtils";
import FormFieldWrapper from "../../shared/components/FormFieldWrapper";
import { InputAppearance } from "../../shared/types/inputAppearance";
import { IconShapes } from "../../icon/components/Icon";
import IconPropAdapter from "../../icon/components/IconPropAdapter";

export interface TextInputWithIconProps extends TextInputProps {
  /**
   * icon to display at the start of this TextInput.
   */
  iconStart?: IconShapes | React.ReactElement<HTMLElement>;
  /**
   * icon to display at the end of this TextInput.
   */
  iconEnd?: IconShapes | React.ReactElement<HTMLElement>;
}

export interface TextInputWithIconState {
  hasFocus?: boolean;
}

export class TextInputWithIcon<
  P extends TextInputWithIconProps
> extends TextInput<P> {
  public static defaultProps = {
    type: "text",
    appearance: InputAppearance.Standard,
    showInputLabel: true
  };

  state = {
    hasFocus: false
  };

  protected getInputAppearance(): string {
    if (this.props.disabled) {
      return "disabled";
    }
    if (this.state.hasFocus) {
      return `${this.props.appearance}-focus`;
    }
    return this.props.appearance;
  }

  protected getInputElementProps() {
    const baseProps = super.getInputElementProps();
    const {
      iconStart,
      iconEnd,
      ...inputProps
    } = baseProps as TextInputWithIconProps;
    inputProps.onFocus = this.inputOnFocus;
    inputProps.onBlur = this.inputOnBlur;
    return inputProps;
  }

  protected getIconStartContent() {
    if (!this.props.iconStart) {
      return null;
    }
    return (
      <span
        className={cx(
          padding("right", "xs"),
          flex({ align: "center", justify: "center" }),
          flexItem("shrink"),
          getIconAppearanceStyle(this.getInputAppearance()),
          inputIconWrapper
        )}
      >
        <IconPropAdapter
          icon={this.props.iconStart!}
          size="xs"
          color="inherit"
        />
      </span>
    );
  }

  protected getIconEndContent() {
    if (!this.props.iconEnd) {
      return null;
    }
    return (
      <span
        className={cx(
          flex({ align: "center", justify: "center" }),
          flexItem("shrink"),
          flush("left"),
          getIconAppearanceStyle(this.getInputAppearance()),
          inputIconWrapper
        )}
      >
        <IconPropAdapter icon={this.props.iconEnd!} size="xs" color="inherit" />
      </span>
    );
  }

  protected getInputContent() {
    const inputAppearance = this.getInputAppearance();
    return (
      <FormFieldWrapper
        // TODO: figure out how to get rid of this non-null assertion
        // If we stop generating an `id` prop in the TextInput component,
        // it would be possible for `this.props.id` to be undefined
        id={this.props.id!}
        errors={this.props.errors}
        hintContent={this.props.hintContent}
      >
        {({ getValidationErrors, getHintContent, isValid, describedByIds }) => (
          <div>
            <div
              className={cx(
                flex(),
                padding("left", "s"),
                padding("right", "s"),
                inputContainer,
                getInputAppearanceStyle(inputAppearance)
              )}
            >
              {this.getIconStartContent()}
              {this.getInputElement(
                [flexItem("grow"), padding("all", "none")],
                isValid,
                describedByIds
              )}
              {this.getIconEndContent()}
            </div>
            {getHintContent}
            {getValidationErrors}
          </div>
        )}
      </FormFieldWrapper>
    );
  }

  protected inputOnFocus = e => {
    this.setState({ hasFocus: true });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  protected inputOnBlur = e => {
    this.setState({ hasFocus: false });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };
}

export default TextInputWithIcon;
