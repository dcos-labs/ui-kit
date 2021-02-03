import * as React from "react";
import { cx } from "@emotion/css";
import nextId from "react-id-generator";
import { ToggleBoxProps } from "./ToggleBox";
import { Flex, FlexItem } from "../../styleUtils/layout";
import { BreakpointConfig } from "../../shared/styles/breakpoints";
import { SpaceSize } from "../../shared/styles/styleUtils/modifiers/modifierUtils";
import { legendReset, fieldsetReset } from "../../shared/styles/styleUtils";
import { getLabelStyle } from "../../shared/styles/formStyles";
import { toggleBoxGroupItem } from "../style";

type FlexDirection = BreakpointConfig<React.CSSProperties["flexDirection"]>;

export interface ToggleBoxGroupProps {
  children: Array<React.ReactElement<ToggleBoxProps>>;
  /**
   * The unique identifier for a collection of ToggleBoxes
   */
  id?: string;
  /**
   * The direction the `ToggleBox` children are laid out in. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  direction?: FlexDirection;
  /**
   * The size of the space between each `ToggleBox` child. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  gutterSize?: SpaceSize;
  /**
   * Whether multiple ToggleBoxes can be selected
   */
  multiSelect?: boolean;
  /**
   * An array of selected ToggleBox values
   */
  selectedItems?: string[];
  /**
   * Callback for when a user makes a selection. Passes an array selected ToggleBox values as a parameter
   */
  onChange?: (selectedItems: string[]) => void;
  /**
   * A label for the group of ToggleBox inputs
   */
  label?: React.ReactNode;
}

class ToggleBoxGroup extends React.PureComponent<ToggleBoxGroupProps> {
  render() {
    const {
      children,
      direction = "row" as FlexDirection,
      gutterSize = "m" as SpaceSize,
      id = nextId("toggleBoxGroup-"),
      label,
      multiSelect,
      onChange,
      selectedItems = []
    } = this.props;

    const getSelectedItems = (value, checked) => {
      if (checked) {
        return multiSelect ? [...selectedItems, value] : [value];
      }

      return selectedItems.filter(selectedChoice => selectedChoice !== value);
    };

    const toggleBoxes = () => (
      <Flex direction={direction} gutterSize={gutterSize} align="stretch">
        {React.Children.toArray(children).map(toggleBox => {
          const { name, value, ...childOther } = toggleBox.props;
          const handleChange = e => {
            if (onChange) {
              onChange(getSelectedItems(value, e.target.checked));
            }
          };

          delete childOther.onChange;

          return (
            <FlexItem
              key={`buttonWrapper-${childOther.id}`}
              className={toggleBoxGroupItem}
            >
              {React.cloneElement(toggleBox, {
                name: !multiSelect ? name || id : name,
                type: multiSelect ? "checkbox" : "radio",
                onChange: handleChange,
                isActive: selectedItems.includes(value),
                id: childOther.id,
                value,
                ...childOther
              })}
            </FlexItem>
          );
        })}
      </Flex>
    );
    return label ? (
      <fieldset className={fieldsetReset}>
        <legend className={cx(legendReset, getLabelStyle())}>{label}</legend>
        {toggleBoxes()}
      </fieldset>
    ) : (
      toggleBoxes()
    );
  }
}

export default ToggleBoxGroup;
