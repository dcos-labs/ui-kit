import * as React from "react";
import { jsx } from "@emotion/core";
import CheckboxInput, {
  CheckboxInputProps
} from "../../components/CheckboxInput";
import { InputAppearance } from "../../../shared/types/inputAppearance";

export interface CheckboxInputState {
  isChecked: boolean;
}

class CheckboxStoryHelper extends React.PureComponent<
  CheckboxInputProps,
  CheckboxInputState
> {
  public static defaultProps: Partial<CheckboxInputProps> = {
    appearance: InputAppearance.Standard
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isChecked: props.checked || false
    };
  }

  public render() {
    const {
      appearance,
      disabled,
      indeterminate,
      id,
      inputLabel,
      showInputLabel,
      value,
      vertAlign
    } = this.props;

    return (
      <CheckboxInput
        appearance={appearance}
        checked={this.state.isChecked}
        disabled={disabled}
        id={id}
        inputLabel={inputLabel}
        onChange={this.handleChange}
        showInputLabel={showInputLabel}
        value={value}
        vertAlign={vertAlign}
        indeterminate={indeterminate}
      />
    );
  }

  private handleChange(e) {
    this.setState({ isChecked: e.target.checked });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
}

export default CheckboxStoryHelper;
