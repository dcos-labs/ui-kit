import * as React from "react";
import { cx } from "@emotion/css";
import {
  optionalIcon,
  select,
  selectIcon,
  selectContainer,
  DROPDOWN_ARROW_ICON_SIZE
} from "../style";
import {
  inputContainer,
  getInputAppearanceStyle,
  getIconAppearanceStyle
} from "../../shared/styles/formStyles";
import { inputReset, padding, display } from "../../shared/styles/styleUtils";
import Icon, { IconShapes } from "../../icon/components/Icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import FormFieldWrapper from "../../shared/components/FormFieldWrapper";
import { InputAppearance } from "../../shared/types/inputAppearance";
import IconPropAdapter from "../../icon/components/IconPropAdapter";
import { renderLabel } from "../../utilities/label";

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
   * Optional icon to be displayed before the input value.
   */
  iconStart?: IconShapes | React.ReactElement<HTMLElement>;
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
  /**
   * Sets the text content for the tooltip that can be displayed above the input.
   */
  tooltipContent?: React.ReactNode;
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
      iconStart,
      id,
      options,
      showInputLabel,
      inputLabel,
      tooltipContent,
      ...other
    } = this.props;
    delete other.onFocus;
    delete other.onBlur;

    const hasError = appearance === InputAppearance.Error;
    const parentDataCy = `selectInput selectInput.${appearance}`;
    const selectDataCy = `selectInput-select selectInput-select.${appearance}`;

    return (
      <FormFieldWrapper
        id={id}
        errors={errors}
        hintContent={this.props.hintContent}
      >
        {({ getValidationErrors, isValid, getHintContent, describedByIds }) => (
          <div data-cy={parentDataCy}>
            {renderLabel({
              appearance,
              hidden: !showInputLabel,
              id,
              label: inputLabel,
              required: this.props.required,
              tooltipContent
            })}

            <span
              className={cx(
                selectContainer,
                inputContainer,
                getInputAppearanceStyle(this.getInputAppearance()),
                display("flex")
              )}
            >
              {iconStart ? (
                <span className={cx(optionalIcon)}>
                  <IconPropAdapter
                    icon={iconStart}
                    size={DROPDOWN_ARROW_ICON_SIZE}
                    color="inherit"
                  />
                </span>
              ) : null}
              <select
                className={cx(inputReset, select, display("block"))}
                aria-invalid={!isValid}
                aria-describedby={describedByIds}
                id={id}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                data-cy={selectDataCy}
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
              <span
                className={cx(
                  selectIcon,
                  padding("horiz", "m"),
                  getIconAppearanceStyle(this.getInputAppearance())
                )}
              >
                <Icon
                  shape={SystemIcons.TriangleDown}
                  size={DROPDOWN_ARROW_ICON_SIZE}
                  color="inherit"
                />
              </span>
            </span>
            {Boolean(getHintContent) || hasError ? (
              <div data-cy="selectInput-hintContent">
                {getHintContent}
                {hasError && getValidationErrors}
              </div>
            ) : null}
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
