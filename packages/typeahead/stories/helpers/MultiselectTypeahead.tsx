import * as React from "react";
import { cx } from "@emotion/css";
import { Item } from "../../components/Typeahead";
import {
  flex,
  flexItem,
  padding,
  textWeight
} from "../../../shared/styles/styleUtils";
import { items } from "./itemMocks";

interface RenderProps {
  items: Item[];
  selectedItems: string[];
  selectHandler: (selectedItems: string[]) => void;
}

interface MultiselectTypeaheadProps {
  children: (renderProps: RenderProps) => React.ReactNode;
}

interface MultiselectTypeaheadState {
  selectedItems: string[];
}

class MultiselectTypeahead extends React.PureComponent<
  MultiselectTypeaheadProps,
  MultiselectTypeaheadState
> {
  constructor(props) {
    super(props);

    this.selectHandler = this.selectHandler.bind(this);

    this.state = {
      selectedItems: props.selectedItems || []
    };
  }

  selectHandler(selectedItems) {
    this.setState({ selectedItems });
  }

  render() {
    const { children } = this.props;

    return (
      <div className={flex()}>
        <div className={flexItem("grow")}>
          {children({
            selectedItems: this.state.selectedItems,
            selectHandler: this.selectHandler,
            items
          })}
        </div>
        <div className={cx(flexItem("grow"), padding("left"))}>
          <span className={textWeight("medium")}>Selections:</span>
          <ul>
            {this.state.selectedItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MultiselectTypeahead;
