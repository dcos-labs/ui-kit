import * as React from "react";
import { jsx } from "@emotion/core";
import { Table, Column, Cell, HeaderCell } from "../..";
import { width } from "./mocks";

const itemCellRenderer = item => (
  <Cell>
    <span>{item}</span>
  </Cell>
);

const randomNumbers = n => new Array(n).fill(0).map(() => Math.random() * 100);

class ChangingTable extends React.Component<{}, { items: number[] }> {
  constructor(props) {
    super(props);
    this.state = {
      items: randomNumbers(20)
    };

    setInterval(() => {
      this.setState({
        items: randomNumbers(20)
      });
    }, 100);
  }

  render() {
    return (
      <Table data={this.state.items}>
        <Column
          header={<HeaderCell>name</HeaderCell>}
          cellRenderer={itemCellRenderer}
          width={width}
        />
      </Table>
    );
  }
}

export default ChangingTable;
