import { cx } from "@emotion/css";
import * as React from "react";
import nextId from "react-id-generator";

import FormFieldWrapper from "../../shared/components/FormFieldWrapper";
import {
  getInputAppearanceStyle,
  inputContainer
} from "../../shared/styles/formStyles";
import { inputReset, padding } from "../../shared/styles/styleUtils";
import { flex, flexItem } from "../../shared/styles/styleUtils/layout/flexbox";
import { InputAppearance } from "../../shared/types/inputAppearance";
import { renderLabel } from "../../utilities/label";

export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  /**
   * The HTML input type for this component.
   */
  type: "text" | "number" | "search" | "email" | "password" | "tel" | "url";
  /**
   * Sets the current appearance of the input component. This defaults to InputAppearance.Standard, but supports `InputAppearance.Error` & `InputAppearance.Success` appearances as well.
   */
  appearance: InputAppearance;
  /**
   * Sets the contents of the input label. This can be a `string` or any `ReactNode`.
   */
  inputLabel?: React.ReactNode;
  /**
   * Defaults to `true`, but can be set to `false` to visibly hide the `TextInput`'s label. The `inputLabel` should still be set even when hidden for accessibility support.
   */
  showInputLabel: boolean;
  /**
   * hintContent is text or a ReactNode that is displayed directly under the input with additional information about the expected input.
   */
  hintContent?: React.ReactNode;
  /**
   * Sets the contents for validation errors. This will be displayed below the input element. Errors are only visible when the `TextInput` appearance is also set to `InputAppearance.Error`.
   */
  errors?: React.ReactNode[];
  /**
   * Sets the text content for the tooltip that can be displayed above the input.
   */
  tooltipContent?: React.ReactNode;
}

export class TextInput<P extends TextInputProps> extends React.Component<P> {
  public static defaultProps = {
    type: "text",
    appearance: InputAppearance.Standard,
    showInputLabel: true
  };
  placeholderId = nextId("textInput-");

  public render() {
    const containerProps: { className?: string } = {};
    const appearance = this.getInputAppearance();
    const dataCy = `textInput textInput.${appearance}`;

    if (this.props.className) {
      containerProps.className = this.props.className;
    }
    return (
      <div {...containerProps} data-cy={dataCy}>
        {renderLabel({
          appearance,
          hidden: !this.props.showInputLabel,
          id: this.getId(),
          label: this.props.inputLabel,
          required: this.props.required,
          tooltipContent: this.props.tooltipContent
        })}
        {this.getInputContent()}
      </div>
    );
  }

  protected getInputAppearance(): string {
    return this.props.disabled ? "disabled" : this.props.appearance;
  }

  protected getInputContent(): React.ReactNode {
    const appearance = this.getInputAppearance();

    return (
      <FormFieldWrapper
        id={this.getId()}
        errors={this.props.errors}
        hintContent={this.props.hintContent}
      >
        {({ getValidationErrors, getHintContent, isValid, describedByIds }) => (
          <div>
            <div className={flex()}>
              {this.getInputElement(
                [
                  padding("horiz", "m"),
                  flexItem("grow"),
                  inputContainer,
                  getInputAppearanceStyle(this.getInputAppearance())
                ],
                isValid,
                describedByIds
              )}
            </div>
            <div data-cy="textInput-hintContent">
              {getHintContent}
              {appearance === InputAppearance.Error && getValidationErrors}
            </div>
          </div>
        )}
      </FormFieldWrapper>
    );
  }
  protected getInputElementProps(): TextInputProps {
    // omit props for container and that we override, otherwise pass through
    // TextInput props to input element
    const {
      className,
      hintContent,
      inputLabel,
      errors,
      id = this.placeholderId,
      ...inputElementProps
    } = this.props;

    return { ...inputElementProps, id };
  }

  protected getInputElement(
    additionalClasses: string[] = [],
    isValid: boolean,
    describedBy: string
  ) {
    const {
      value,
      showInputLabel,
      appearance,
      ...inputElementProps
    } = this.getInputElementProps();
    const textInputAppearance = this.getInputAppearance();
    const dataCy = [
      "textInput-input",
      ...(textInputAppearance &&
      textInputAppearance !== InputAppearance.Standard
        ? [`textInput-input.${textInputAppearance}`]
        : [])
    ].join(" ");
    let { onChange } = inputElementProps;
    if (onChange == null && value != null) {
      onChange = Function.prototype as (
        event: React.FormEvent<HTMLInputElement>
      ) => void;
    }

    return (
      <input
        className={cx(inputReset, ...additionalClasses)}
        type={this.props.type}
        aria-invalid={!isValid}
        aria-describedby={describedBy}
        data-cy={dataCy}
        {...{ ...inputElementProps, onChange, value }}
      />
    );
  }

  private getId(): string {
    if (typeof this.props.id === "string") {
      return this.props.id;
    }

    return this.placeholderId;
  }
}

export default TextInput;
