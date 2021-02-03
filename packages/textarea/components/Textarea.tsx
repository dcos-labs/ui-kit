import * as React from "react";
import { InputAppearance } from "../../shared/types/inputAppearance";
import FormFieldWrapper from "../../shared/components/FormFieldWrapper";
import { cx } from "@emotion/css";
import { inputReset } from "../../shared/styles/styleUtils";
import {
  getInputAppearanceStyle,
  inputContainer
} from "../../shared/styles/formStyles";
import { textarea } from "../style";
import nextId from "react-id-generator";
import { renderLabel } from "../../utilities/label";

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  /**
   * Unique identifier used for the form textarea element
   */
  id: string;
  /**
   * Sets the current appearance of the component. This defaults to InputAppearance.Standard, but supports `InputAppearance.Error` & `InputAppearance.Success` appearances as well.
   */
  appearance: InputAppearance;
  /**
   * Sets the contents of the label. This can be a `string` or any `ReactNode`.
   */
  inputLabel: React.ReactNode;
  /**
   * Defaults to `true`, but can be set to `false` to visibly hide the `Textarea`'s label. The `inputLabel` should still be set even when hidden for accessibility support.
   */
  showInputLabel: boolean;
  /**
   * Text or a ReactNode that is displayed directly under the textarea with additional information about the expected input.
   */
  hintContent?: React.ReactNode;
  /**
   * Sets the contents for validation errors. This will be displayed below the textarea element. Errors are only visible when the `Textarea` appearance is also set to `InputAppearance.Error`.
   */
  errors?: React.ReactNode[];
  /**
   * Sets the text content for the tooltip that can be displayed above the input.
   */
  tooltipContent?: React.ReactNode;
}

class Textarea extends React.PureComponent<TextareaProps, {}> {
  public static defaultProps: Partial<TextareaProps> = {
    appearance: InputAppearance.Standard,
    showInputLabel: true,
    rows: 3
  };

  id = this.props.id ?? nextId("textarea-");

  public render() {
    const {
      appearance,
      errors,
      hintContent,
      id,
      inputLabel,
      showInputLabel,
      tooltipContent,
      value,
      ...other
    } = this.props;
    const hasError = appearance === InputAppearance.Error;
    let { onChange } = other;
    const inputAppearance = this.getInputAppearance();
    if (onChange == null && value != null) {
      onChange = Function.prototype as (
        event: React.FormEvent<HTMLTextAreaElement>
      ) => void;
    }
    const parentDataCy = `textarea textarea.${inputAppearance}`;
    const textareaDataCy = `textarea-textarea textarea-textarea.${inputAppearance}`;

    return (
      <FormFieldWrapper id={id} errors={errors} hintContent={hintContent}>
        {({ getValidationErrors, getHintContent, isValid, describedByIds }) => (
          <div data-cy={parentDataCy}>
            {renderLabel({
              appearance,
              hidden: !showInputLabel,
              id: this.id,
              label: inputLabel,
              required: this.props.required,
              tooltipContent
            })}

            <textarea
              aria-invalid={!isValid}
              aria-describedby={describedByIds}
              value={value}
              id={id}
              className={cx(
                inputReset,
                inputContainer,
                getInputAppearanceStyle(this.getInputAppearance()),
                textarea
              )}
              required={this.props.required}
              data-cy="textarea-textarea"
              {...{ ...other, onChange }}
            />
            <div data-cy={textareaDataCy}>
              {getHintContent}
              {hasError ? getValidationErrors : null}
            </div>
          </div>
        )}
      </FormFieldWrapper>
    );
  }

  private getInputAppearance(): string {
    return this.props.disabled ? "disabled" : this.props.appearance;
  }
}

export default Textarea;
