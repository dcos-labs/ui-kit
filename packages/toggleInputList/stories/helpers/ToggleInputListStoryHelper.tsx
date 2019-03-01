import * as React from "react";
import { jsx } from "@emotion/core";
import ToggleInputList, {
  ToggleInputListProps
} from "../../components/ToggleInputList";

interface ToggleInputListStoryHelperState {
  selectedItems: string[];
}

class ToggleInputListStoryHelper extends React.PureComponent<
  ToggleInputListProps,
  ToggleInputListStoryHelperState
> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectedItems: props.selectedItems || []
    };
  }

  render() {
    const {
      items,
      listLabel,
      showListLabel,
      errors,
      hintContent,
      id
    } = this.props;

    return (
      <ToggleInputList
        items={items}
        listLabel={listLabel}
        showListLabel={showListLabel}
        onChange={this.handleChange}
        selectedItems={this.state.selectedItems}
        errors={errors}
        hintContent={hintContent}
        id={id}
      />
    );
  }

  private handleChange(value) {
    this.setState({ selectedItems: value });
  }
}

export default ToggleInputListStoryHelper;
