import * as React from "react";
import { cx } from "@emotion/css";
import TextInputWithIcon, { TextInputWithIconProps } from "./TextInputWithIcon";
import FormFieldWrapper from "../../shared/components/FormFieldWrapper";
import { flex, padding, flexItem } from "../../shared/styles/styleUtils";
import {
  inputContainer,
  getInputAppearanceStyle
} from "../../shared/styles/formStyles";
import { TextInputButtonProps } from "../../textInputButton/components/TextInputButton";

export interface TextInputWithButtonsProps
  extends Omit<TextInputWithIconProps, "iconEnd"> {
  /**
   * An array of TextInputButton components to render at the end of the input
   */
  buttons: Array<React.ReactElement<TextInputButtonProps>>;
}

class TextInputWithButtons extends TextInputWithIcon<
  TextInputWithButtonsProps
> {
  protected getInputElementProps() {
    const baseProps = super.getInputElementProps();
    const { buttons, ...inputProps } = baseProps as TextInputWithButtonsProps;

    return inputProps;
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
          <React.Fragment>
            <div
              className={cx(
                flex(),
                padding("horiz", "s"),
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
              {this.getButtons()}
            </div>
            {getHintContent}
            {getValidationErrors}
          </React.Fragment>
        )}
      </FormFieldWrapper>
    );
  }

  private getButtons() {
    if (!this.props.buttons.filter(Boolean)) {
      return;
    }

    return this.props.buttons.map((button, i) => (
      // TODO: consider making a component for this wrapper span
      <span
        className={cx(
          flex({ align: "center", justify: "center" }),
          flexItem("shrink"),
          { [padding("left", "s")]: i !== 0 }
        )}
        key={(React.isValidElement(button) && button.key) || i}
      >
        {button}
      </span>
    ));
  }
}

export default TextInputWithButtons;
