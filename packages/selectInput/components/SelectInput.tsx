import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import { select, selectIcon, selectContainer } from "../style";
import {
  inputContainer,
  inputAppearances,
  getLabelStyle
} from "../../shared/styles/formStyles";
import {
  inputReset,
  padding,
  visuallyHidden,
  display,
  tintText
} from "../../shared/styles/styleUtils";
import Icon from "../../icon/components/Icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import { iconSizeXs, error } from "../../design-tokens/build/js/designTokens";
import FormFieldWrapper from "../../shared/components/FormFieldWrapper";
import { InputAppearance } from "../../shared/types/inputAppearance";

export interface SelectOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export interface SelectInputProps extends React.HTMLProps<HTMLSelectElement> {
  /**
   * Sets the current appearance of the select component. This defaults to InputAppearance.Standard, but supports `InputAppearance.Error` & `InputAppearance.Success` appearances as well.
   */
  appearance: InputAppearance;
  /**
   * Sets the contents for validation errors. This will be displayed below the input element. Errors are only visible when the `SelectInput` appearance is also set to `InputAppearance.Error`.
   */
  errors?: React.ReactNode[];
  /**
   * hintContent is text or a ReactNode that is displayed directly under the input with additional information about the expected input.
   */
  hintContent?: React.ReactNode;
  /**
   * Unique identifier used for the form input component
   */
  id: string;
  /**
   * Sets the contents of the input label. This can be a `string` or any `ReactNode`.
   */
  inputLabel: React.ReactNode;
  /**
   * An array of objects that describes the options the select input contains
   */
  options: SelectOption[];
  /**
   * Defaults to `true`, but can be set to `false` to visibly hide the `TextInput`'s label. The `inputLabel` should still be set even when hidden for accessibility support.
   */
  showInputLabel?: boolean;
}

export interface SelectInputState {
  hasFocus: boolean;
}

class SelectInput extends React.PureComponent<
  SelectInputProps,
  SelectInputState
> {
  public static defaultProps: Partial<SelectInputProps> = {
    appearance: InputAppearance.Standard,
    showInputLabel: true
  };

  constructor(props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      hasFocus: false
    };
  }

  public render() {
    const {
      appearance,
      errors,
      hintContent,
      id,
      inputLabel,
      options,
      showInputLabel,
      required,
      ...other
    } = this.props;
    delete other.onFocus;
    delete other.onBlur;

    const hasError = appearance === InputAppearance.Error;

    return (
      <FormFieldWrapper id={id} errors={errors} hintContent={hintContent}>
        {({ getValidationErrors, isValid, getHintContent, describedByIds }) => (
          <div>
            <label
              className={cx(getLabelStyle(hasError), {
                [visuallyHidden]: !showInputLabel
              })}
              htmlFor={id}
            >
              {inputLabel}
              {required ? (
                <span className={cx(tintText(error))}> *</span>
              ) : null}
            </label>
            <span
              className={cx(
                selectContainer,
                inputContainer,
                inputAppearances[this.getInputAppearance()],
                display("flex")
              )}
            >
              <select
                className={cx(inputReset, select, display("block"))}
                aria-invalid={!isValid}
                aria-describedby={describedByIds}
                id={id}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                {...other}
              >
                {options.map((option, key) => (
                  /* tslint:disable react-a11y-role-has-required-aria-props */
                  /* <option> tag doesn't need additional aria markup */
                  <option
                    key={key}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                  /* tslint:enable */
                ))}
              </select>
              <span className={cx(selectIcon, padding("horiz", "m"))}>
                <Icon
                  shape={SystemIcons.TriangleDown}
                  size={iconSizeXs}
                  color="inherit"
                />
              </span>
            </span>
            {getHintContent}
            {appearance === InputAppearance.Error && getValidationErrors}
          </div>
        )}
      </FormFieldWrapper>
    );
  }

  private handleFocus(e) {
    this.setState({ hasFocus: true });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  private handleBlur(e) {
    this.setState({ hasFocus: false });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  private getInputAppearance() {
    if (this.props.disabled) {
      return "disabled";
    }
    if (this.state.hasFocus) {
      return `${this.props.appearance}-focus`;
    }
    return this.props.appearance;
  }
}

export default SelectInput;
