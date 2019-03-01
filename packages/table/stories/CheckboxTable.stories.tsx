import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { Column, HeaderCell, TextCell, NumberCell } from "..";
import SortableCheckboxTable from "./helpers/SortableCheckboxTable";
import { items } from "./helpers/mocks";
import CheckboxTableHelper from "./helpers/CheckboxTableHelper";

const readme = require("../README.md");

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

storiesOf("Table/CheckboxTable", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("default", () => (
    <CheckboxTableHelper data={items}>
      <Column
        header={<HeaderCell>name</HeaderCell>}
        cellRenderer={nameCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>role</HeaderCell>}
        cellRenderer={roleCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>state</HeaderCell>}
        cellRenderer={stateCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>Very Long</HeaderCell>}
        cellRenderer={veryLongRenderer}
        maxWidth={300}
      />
      <Column
        header={<HeaderCell textAlign="right">zip code</HeaderCell>}
        cellRenderer={zipcodeCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>city</HeaderCell>}
        cellRenderer={cityCellRenderer}
        growToFill={true}
      />
    </CheckboxTableHelper>
  ))
  .addWithInfo("w/ global action + group action", () => (
    <CheckboxTableHelper
      data={items}
      selectedRows={[items[0]]}
      showGlobalAction={true}
    >
      <Column
        header={<HeaderCell>name</HeaderCell>}
        cellRenderer={nameCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>role</HeaderCell>}
        cellRenderer={roleCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>state</HeaderCell>}
        cellRenderer={stateCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>Very Long</HeaderCell>}
        cellRenderer={veryLongRenderer}
        maxWidth={300}
      />
      <Column
        header={<HeaderCell textAlign="right">zip code</HeaderCell>}
        cellRenderer={zipcodeCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>city</HeaderCell>}
        cellRenderer={cityCellRenderer}
        growToFill={true}
      />
    </CheckboxTableHelper>
  ))
  .addWithInfo("w/ checked row", () => (
    <CheckboxTableHelper data={items} selectedRows={[items[0]]}>
      <Column
        header={<HeaderCell>name</HeaderCell>}
        cellRenderer={nameCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>role</HeaderCell>}
        cellRenderer={roleCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>state</HeaderCell>}
        cellRenderer={stateCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>Very Long</HeaderCell>}
        cellRenderer={veryLongRenderer}
        maxWidth={300}
      />
      <Column
        header={<HeaderCell textAlign="right">zip code</HeaderCell>}
        cellRenderer={zipcodeCellRenderer}
        growToFill={true}
      />
      <Column
        header={<HeaderCell>city</HeaderCell>}
        cellRenderer={cityCellRenderer}
        growToFill={true}
      />
    </CheckboxTableHelper>
  ))
  .addWithInfo("sortable", () => <SortableCheckboxTable />);
