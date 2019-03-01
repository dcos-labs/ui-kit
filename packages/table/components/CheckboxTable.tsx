import * as React from "react";
import { jsx } from "@emotion/core";
import { Table, Column, Cell, HeaderCell } from "..";
import { TableProps } from "./Table";
import CheckboxInput from "../../checkboxInput/components/CheckboxInput";

export interface CheckboxTableProps extends TableProps {
  /**
   * Callback for when a user makes a selection. Passes selected row data as a parameter
   */
  onChange?: (selectedRows: object[]) => void;
}

class CheckboxTable extends React.PureComponent<CheckboxTableProps> {
  constructor(props) {
    super(props);

    this.getSelectedRows = this.getSelectedRows.bind(this);
    this.checkboxCellRenderer = this.checkboxCellRenderer.bind(this);
    this.getHeaderCheckbox = this.getHeaderCheckbox.bind(this);
  }

  render() {
    return (
      <Table
        data={this.props.data}
        selectedRows={this.props.selectedRows}
        rowHeight={this.props.rowHeight}
        fixedColumnCount={2}
      >
        <Column
          header={<HeaderCell>{this.getHeaderCheckbox()}</HeaderCell>}
          cellRenderer={this.checkboxCellRenderer}
        />
        {this.props.children as any}
      </Table>
    );
  }

  private checkboxCellRenderer(rowData) {
    const { data, onChange } = this.props;
    const selectedRows = this.props.selectedRows || [];
    const rowIndex = data.indexOf(rowData);

    const handleOnChange = e => {
      if (onChange) {
        onChange(this.getSelectedRows(rowData, e.target.checked));
      }
    };

    return (
      <Cell>
        <CheckboxInput
          id={rowIndex.toString()}
          inputLabel={`Toggle row ${rowIndex}`}
          showInputLabel={false}
          checked={selectedRows.includes(rowData)}
          onChange={handleOnChange}
        />
      </Cell>
    );
  }

  private getHeaderCheckbox() {
    const selectedRows = this.props.selectedRows || [];
    let isSelected = false;

    const handleChange = e => {
      isSelected = e.target.checked;
      if (this.props.onChange) {
        this.props.onChange(isSelected ? this.props.data : []);
      }
    };

    return (
      <CheckboxInput
        id="headerCheckbox"
        inputLabel="Toggle all rows"
        showInputLabel={false}
        checked={
          (selectedRows.length &&
            selectedRows.length === this.props.data.length) ||
          isSelected
        }
        indeterminate={
          Boolean(selectedRows.length) &&
          selectedRows.length < this.props.data.length
        }
        disabled={!Boolean(this.props.data.length)}
        onChange={handleChange}
      />
    );
  }

  private getSelectedRows(rowData, checked) {
    const selectedRows = this.props.selectedRows || [];

    if (checked) {
      return [...selectedRows, rowData];
    }

    return selectedRows.filter(selectedRow => selectedRow !== rowData);
  }
}

export default CheckboxTable;
