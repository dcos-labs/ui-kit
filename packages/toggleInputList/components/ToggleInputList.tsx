import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import CheckboxInput from "../../checkboxInput/components/CheckboxInput";
import FormFieldWrapper from "../../shared/components/FormFieldWrapper";
import {
  listReset,
  fieldsetReset,
  legendReset,
  padding,
  textWeight,
  visuallyHidden
} from "../../shared/styles/styleUtils";
import { InputAppearance } from "../../shared/types/inputAppearance";

export interface ToggleInputProperties {
  appearance?: InputAppearance;
  inputLabel: string;
  id: string;
  value: string;
  disabled?: boolean;
}

export interface ToggleInputListProps {
  /**
   * Sets the contents for validation errors. This will be displayed below the list of options.
   */
  errors?: React.ReactNode[];
  /**
   * hintContent is text or a ReactNode that is displayed directly under the set of options with additional information about the expected input.
   */
  hintContent?: React.ReactNode;
  /**
   * Unique identifier used for the set of toggle inputs
   */
  id: string;
  /**
   * The set of options described as an array of objects
   */
  items: ToggleInputProperties[];
  /**
   * A label to help users understand what they're picking an option for
   */
  listLabel: React.ReactNode | string;
  /**
   * Callback for when a user makes a selection. Passes a list of selected items as parameter
   */
  onChange?: (selectedItems: string[]) => void;
  /**
   * Defaults to `true`, but can be set to `false` to visibly hide the content passed to `listLabel`. The `listLabel` should still be set even when hidden for accessibility support.
   */
  showListLabel?: boolean;
  /**
   * The subset of selected options
   */
  selectedItems?: string[];
  /**
   * How the text content of each option vertically aligns with it's related input
   */
  vertAlign?: "center" | "top";
}

class ToggleInputList extends React.PureComponent<ToggleInputListProps, {}> {
  public static defaultProps: Partial<ToggleInputListProps> = {
    showListLabel: true,
    vertAlign: "center",
    selectedItems: []
  };

  constructor(props) {
    super(props);

    this.getSelectedItems = this.getSelectedItems.bind(this);
  }

  public render() {
    const { listLabel, showListLabel, errors, hintContent, id } = this.props;

    return (
      <FormFieldWrapper errors={errors} hintContent={hintContent} id={id}>
        {({ describedByIds, getValidationErrors, isValid, getHintContent }) => (
          <fieldset
            className={fieldsetReset}
            aria-invalid={!isValid}
            aria-describedby={describedByIds}
          >
            <legend
              className={cx(legendReset, textWeight("medium"), {
                [visuallyHidden]: !showListLabel
              })}
            >
              {listLabel}
            </legend>
            <ul className={listReset}>{this.inputListItems()}</ul>
            {getHintContent}
            {getValidationErrors}
          </fieldset>
        )}
      </FormFieldWrapper>
    );
  }

  private inputListItems() {
    const { items } = this.props;

    return items.map(item => {
      const { id, value, inputLabel, appearance, disabled } = item;
      const { vertAlign, onChange } = this.props;
      const selectedItems = this.props.selectedItems || [];

      const handleChange = e => {
        if (onChange) {
          onChange(this.getSelectedItems(value, e.target.checked));
        }
      };

      return (
        <li className={padding("top", "xs")} key={id}>
          {/* TODO: When we have radio inputs and/or toggle switches,
              update this function to return a component dynamically */}
          <CheckboxInput
            appearance={appearance}
            disabled={disabled}
            id={id}
            inputLabel={inputLabel}
            onChange={handleChange}
            value={value}
            vertAlign={vertAlign}
            checked={selectedItems.includes(value)}
          />
        </li>
      );
    });
  }

  private getSelectedItems(value, checked) {
    const selectedItems = this.props.selectedItems || [];

    if (checked) {
      return [...selectedItems, value];
    }

    return selectedItems.filter(selectedItem => selectedItem !== value);
  }
}

export default ToggleInputList;
