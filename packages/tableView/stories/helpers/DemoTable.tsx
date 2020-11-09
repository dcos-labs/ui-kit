import * as React from "react";
import {
  Table_Deprecated as Table,
  Column,
  HeaderCell,
  TextCell,
  NumberCell
} from "../../../table_deprecated";

export const items = [
  {
    name: "Brian Vaughn",
    role: "Software Engineer",
    city: "San Jose",
    state: "CA",
    zipcode: 95125
  },
  {
    name: "Jon Doe",
    role: "Product engineer",
    city: "Mountain View",
    state: "CA",
    zipcode: 95125
  },
  {
    name: "Jane Doe",
    role: "UX Designer",
    city: "San Francisco",
    state: "CA",
    zipcode: 95125
  },
  {
    name: "Ada Lovelace",
    role: "Software Engineer",
    city: "San Jose",
    state: "CA",
    zipcode: 95125
  },
  {
    name: "Alan Turing",
    role: "Product engineer",
    city: "Mountain View",
    state: "CA",
    zipcode: 95125
  },
  {
    name: "Grace Hopper",
    role: "UX Designer",
    city: "San Francisco",
    state: "CA",
    zipcode: 95125
  }
];

const nameCellRenderer = ({ name }: { name?: string }) => (
  <TextCell>
    <strong>{name}</strong>
  </TextCell>
);
const cityCellRenderer = ({ city }: { city?: string }) => (
  <TextCell>
    <strong>{city}</strong>
  </TextCell>
);
const roleCellRenderer = ({ role }: { role?: string }) => (
  <TextCell>
    <span>{role}</span>
  </TextCell>
);
const stateCellRenderer = ({ state }: { state?: string }) => (
  <TextCell>
    <span>{state}</span>
  </TextCell>
);
const zipcodeCellRenderer = ({ zipcode }: { zipcode?: string }) => (
  <NumberCell>
    <span>{zipcode}</span>
  </NumberCell>
);
const veryLongRenderer = () => (
  <TextCell>
    <span>
      {Array(100)
        .fill("VeryLongWord")
        .join("")}
    </span>
  </TextCell>
);

const DemoTable = ({ rowHeight }: { rowHeight?: number }) => (
  <Table data={items} rowHeight={rowHeight}>
    <Column
      header={<HeaderCell>name</HeaderCell>}
      cellRenderer={nameCellRenderer}
      minWidth={100}
    />
    <Column
      header={<HeaderCell>role</HeaderCell>}
      cellRenderer={roleCellRenderer}
      minWidth={100}
    />
    <Column
      header={<HeaderCell>state</HeaderCell>}
      cellRenderer={stateCellRenderer}
      minWidth={100}
    />
    <Column
      header={<HeaderCell>Very Long</HeaderCell>}
      cellRenderer={veryLongRenderer}
      minWidth={100}
    />
    <Column
      header={<HeaderCell textAlign="right">zip code</HeaderCell>}
      cellRenderer={zipcodeCellRenderer}
      minWidth={100}
    />
    <Column
      header={<HeaderCell>city</HeaderCell>}
      cellRenderer={cityCellRenderer}
      minWidth={100}
    />
  </Table>
);

export default DemoTable;
