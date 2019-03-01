import * as React from "react";
import { jsx } from "@emotion/core";
import CheckboxTable, {
  CheckboxTableProps
} from "../../components/CheckboxTable";
import { DangerButton, StandardButton } from "../../../button";

interface CheckboxTableHelperState {
  items: any[];
  selectedRows: object[];
}

interface CheckboxTableHelperProps extends CheckboxTableProps {
  showGlobalAction?: boolean;
}

class CheckboxTableHelper extends React.PureComponent<
  CheckboxTableHelperProps,
  CheckboxTableHelperState
> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      selectedRows: props.selectedRows || [],
      items: props.data || []
    };
  }

  render() {
    return (
      <div
        style={{
          height: "200px",
          width: "100%",
          fontSize: "14px"
        }}
      >
        <div
          style={{
            minHeight: "37px",
            paddingBottom: "1em",
            textAlign: "right"
          }}
        >
          {Boolean(this.props.showGlobalAction) && (
            <span style={{ paddingRight: "1em" }}>
              <StandardButton>Global action</StandardButton>
            </span>
          )}
          {Boolean(this.state.selectedRows.length) && (
            <DangerButton onClick={this.handleDelete}>
              Delete selected
            </DangerButton>
          )}
        </div>
        <CheckboxTable
          data={this.state.items}
          onChange={this.handleChange}
          selectedRows={this.state.selectedRows}
        >
          {this.props.children}
        </CheckboxTable>
      </div>
    );
  }

  private handleChange(value) {
    this.setState({ selectedRows: value });
  }

  private handleDelete() {
    const newState = this.state.items.filter(
      row => !this.state.selectedRows.includes(row)
    );
    this.setState({ items: newState, selectedRows: [] });
  }
}

export default CheckboxTableHelper;
