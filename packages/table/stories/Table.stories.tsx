import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { WidthArgs } from "../components/Column";
import { Table, Column, Cell, HeaderCell, TextCell, NumberCell } from "..";
import ChangingTable from "./helpers/ChangingTable";
import SortableTable from "./helpers/SortableTable";
import { items, width } from "./helpers/mocks";
import { StandardButton } from "../../button";

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

const empty = () => <Cell>empty</Cell>;

storiesOf("Table", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("collection table", () => (
    <div
      style={{
        height: "175px",
        width: "100%",
        fontSize: "14px"
      }}
    >
      <Table data={items}>
        <Column
          header={<HeaderCell>name</HeaderCell>}
          cellRenderer={nameCellRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell>role</HeaderCell>}
          cellRenderer={roleCellRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell>state</HeaderCell>}
          cellRenderer={stateCellRenderer}
          width={width}
        />
        <Column header="" cellRenderer={empty} width={width} />
        <Column
          header={<HeaderCell>Very Long</HeaderCell>}
          cellRenderer={veryLongRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell textAlign="right">zip code</HeaderCell>}
          cellRenderer={zipcodeCellRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell>city</HeaderCell>}
          cellRenderer={cityCellRenderer}
          width={width}
        />
      </Table>
    </div>
  ))
  .addWithInfo("column width match content", () => (
    <div
      style={{
        height: "175px",
        width: "100%",
        fontSize: "14px"
      }}
    >
      <Table data={items}>
        <Column
          header={<HeaderCell>name</HeaderCell>}
          cellRenderer={nameCellRenderer}
        />
        <Column
          header={<HeaderCell>role</HeaderCell>}
          cellRenderer={roleCellRenderer}
        />
        <Column
          header={<HeaderCell>state</HeaderCell>}
          cellRenderer={stateCellRenderer}
        />
        <Column
          header={<HeaderCell>Very Long</HeaderCell>}
          cellRenderer={veryLongRenderer}
          maxWidth={300}
        />
        <Column
          header={<HeaderCell textAlign="right">zip code</HeaderCell>}
          cellRenderer={zipcodeCellRenderer}
        />
        <Column
          header={<HeaderCell>city</HeaderCell>}
          cellRenderer={cityCellRenderer}
          maxWidth={200}
        />
      </Table>
    </div>
  ))
  .addWithInfo("column width fill remaining", () => (
    <div
      style={{
        height: "175px",
        width: "100%",
        fontSize: "14px"
      }}
    >
      <Table data={items}>
        <Column
          header={<HeaderCell>name</HeaderCell>}
          cellRenderer={nameCellRenderer}
        />
        <Column
          header={<HeaderCell>role</HeaderCell>}
          cellRenderer={roleCellRenderer}
          growToFill={true}
        />
        <Column
          header={<HeaderCell>state</HeaderCell>}
          cellRenderer={stateCellRenderer}
        />
        <Column
          header={<HeaderCell>Very Long</HeaderCell>}
          cellRenderer={veryLongRenderer}
          maxWidth={300}
        />
        <Column
          header={<HeaderCell textAlign="right">zip code</HeaderCell>}
          cellRenderer={zipcodeCellRenderer}
        />
        <Column
          header={<HeaderCell>city</HeaderCell>}
          cellRenderer={cityCellRenderer}
          growToFill={true}
        />
      </Table>
    </div>
  ))
  .addWithInfo("width-aware render", () => {
    const stateWidth = (args: WidthArgs): number =>
      Math.min(100, Math.max(200, args.width / args.totalColumns));
    const fillRemainingWidth = (args: WidthArgs): number => args.remainingWidth;
    const nameCellRendererWithWidth = (
      { name }: { name: string },
      width: number
    ) => {
      return (
        <Cell>
          <strong>
            {width > 200 ? name : `${name.charAt(0)}. ${name.split(" ")[1]}`}
          </strong>
        </Cell>
      );
    };

    return (
      <div
        style={{
          height: "175px",
          width: "100%",
          fontSize: "14px"
        }}
      >
        <Table data={items}>
          <Column
            header={<HeaderCell>name</HeaderCell>}
            cellRenderer={nameCellRendererWithWidth}
            width={width}
          />
          <Column
            header={<HeaderCell>state</HeaderCell>}
            cellRenderer={stateCellRenderer}
            width={stateWidth}
          />
          <Column
            header={<HeaderCell>Very Long</HeaderCell>}
            cellRenderer={veryLongRenderer}
            width={fillRemainingWidth}
          />
        </Table>
      </div>
    );
  })
  .addWithInfo("with sortable column", () => (
    <div
      style={{
        height: "175px",
        width: "100%",
        fontSize: "14px"
      }}
    >
      <SortableTable />
    </div>
  ))
  .addWithInfo("no scroll", () => (
    <div
      style={{
        height: "175px",
        width: "100%",
        fontSize: "14px"
      }}
    >
      <Table data={items}>
        <Column
          header={<HeaderCell>name</HeaderCell>}
          cellRenderer={nameCellRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell>role</HeaderCell>}
          cellRenderer={roleCellRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell>state</HeaderCell>}
          cellRenderer={stateCellRenderer}
          width={width}
        />
      </Table>
    </div>
  ))
  .addWithInfo("changing values", () => (
    <div
      style={{
        height: "175px",
        width: "100%",
        fontSize: "14px"
      }}
    >
      <ChangingTable />
    </div>
  ))
  .addWithInfo("with global action", () => (
    <div
      style={{
        height: "175px",
        width: "100%",
        fontSize: "14px"
      }}
    >
      <div
        style={{
          paddingBottom: "1em",
          textAlign: "right"
        }}
      >
        <StandardButton>Global action</StandardButton>
      </div>
      <Table data={items}>
        <Column
          header={<HeaderCell>name</HeaderCell>}
          cellRenderer={nameCellRenderer}
        />
        <Column
          header={<HeaderCell>role</HeaderCell>}
          cellRenderer={roleCellRenderer}
          growToFill={true}
        />
        <Column
          header={<HeaderCell>state</HeaderCell>}
          cellRenderer={stateCellRenderer}
        />
        <Column
          header={<HeaderCell>Very Long</HeaderCell>}
          cellRenderer={veryLongRenderer}
          maxWidth={300}
        />
        <Column
          header={<HeaderCell textAlign="right">zip code</HeaderCell>}
          cellRenderer={zipcodeCellRenderer}
        />
        <Column
          header={<HeaderCell>city</HeaderCell>}
          cellRenderer={cityCellRenderer}
          growToFill={true}
        />
      </Table>
    </div>
  ))
  .addWithInfo("with custom row height", () => (
    <div
      style={{
        height: "300px",
        width: "100%",
        fontSize: "14px"
      }}
    >
      <Table data={items} rowHeight={60}>
        <Column
          header={<HeaderCell>name</HeaderCell>}
          cellRenderer={nameCellRenderer}
        />
        <Column
          header={<HeaderCell>role</HeaderCell>}
          cellRenderer={roleCellRenderer}
          growToFill={true}
        />
        <Column
          header={<HeaderCell>state</HeaderCell>}
          cellRenderer={stateCellRenderer}
        />
        <Column
          header={<HeaderCell>Very Long</HeaderCell>}
          cellRenderer={veryLongRenderer}
          maxWidth={300}
        />
        <Column
          header={<HeaderCell textAlign="right">zip code</HeaderCell>}
          cellRenderer={zipcodeCellRenderer}
        />
        <Column
          header={<HeaderCell>city</HeaderCell>}
          cellRenderer={cityCellRenderer}
          growToFill={true}
        />
      </Table>
    </div>
  ));
