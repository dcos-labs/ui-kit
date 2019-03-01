import * as React from "react";
import { jsx } from "@emotion/core";
import { Table, Column, SortableHeaderCell, Cell, NumberCell } from "../..";
import { items, width } from "./mocks";

type SortDirection = "ASC" | "DESC" | null;
interface ISortableTableDemoState {
  items: any[];
  sortDirection: SortDirection;
  sortColumn: string;
}

const getSortedList = (items, sortColumn) => {
  return items.sort((a, b) => {
    const textA = a[sortColumn].toString().toLowerCase();
    const textB = b[sortColumn].toString().toLowerCase();

    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
};

const nameCellRenderer = ({ name }: { name?: string }) => (
  <Cell>
    <strong>{name}</strong>
  </Cell>
);

const roleCellRenderer = ({ role }: { role?: string }) => (
  <Cell>
    <span>{role}</span>
  </Cell>
);

const zipcodeCellRenderer = ({ zipcode }: { zipcode?: string }) => (
  <NumberCell>
    <span>{zipcode}</span>
  </NumberCell>
);

class SortableTable extends React.Component<{}, ISortableTableDemoState> {
  constructor(props) {
    super(props);

    this.state = {
      items,
      sortDirection: "DESC",
      sortColumn: "name"
    };

    this.handleSortClick = this.handleSortClick.bind(this);
  }

  updateData(
    items: any[],
    sortColumn: string,
    sortDirection: SortDirection,
    currentSortDirection?: SortDirection,
    currentSortColumn?: string
  ) {
    const copiedData = items.slice();

    if (
      sortDirection === currentSortDirection &&
      sortColumn === currentSortColumn
    ) {
      return { items: copiedData, sortDirection, sortColumn };
    }

    if (
      sortDirection !== currentSortDirection &&
      sortColumn === currentSortColumn
    ) {
      return { items: copiedData.reverse(), sortDirection, sortColumn };
    }

    return {
      items: getSortedList(copiedData, sortColumn),
      sortDirection,
      sortColumn
    };
  }

  handleSortClick(columnName: string): void {
    const toggledDirection =
      this.state.sortDirection === "ASC" || this.state.sortColumn !== columnName
        ? "DESC"
        : "ASC";

    this.setState(
      this.updateData(
        this.state.items,
        columnName,
        toggledDirection,
        this.state.sortDirection,
        this.state.sortColumn
      )
    );
  }

  render() {
    const { items, sortDirection, sortColumn } = this.state;

    return (
      <Table data={items.slice()}>
        <Column
          header={
            <SortableHeaderCell
              sortHandler={this.handleSortClick.bind(null, "name")}
              sortDirection={sortColumn === "name" ? sortDirection : null}
              columnContent="name"
            />
          }
          cellRenderer={nameCellRenderer}
          width={width}
        />
        <Column
          header={
            <SortableHeaderCell
              sortHandler={this.handleSortClick.bind(null, "role")}
              sortDirection={sortColumn === "role" ? sortDirection : null}
              columnContent="role"
            />
          }
          cellRenderer={roleCellRenderer}
          width={width}
        />
        <Column
          header={
            <SortableHeaderCell
              sortHandler={this.handleSortClick.bind(null, "zipcode")}
              sortDirection={sortColumn === "zipcode" ? sortDirection : null}
              columnContent="zip code"
              textAlign="right"
            />
          }
          cellRenderer={zipcodeCellRenderer}
          width={width}
        />
      </Table>
    );
  }
}

export default SortableTable;
