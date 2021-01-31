import * as React from "react";
import { cx } from "@emotion/css";
import { Table, Column, HeaderCell, TextCell } from "../..";
import { items } from "./mocks";
import { listReset, padding } from "../../../shared/styles/styleUtils";

interface ResizableTableDemoState {
  resizedVals: Map<string, number>;
}

const nameCellRenderer = ({ name }: { name?: string }) => (
  <TextCell>
    <strong>{name}</strong>
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

class ResizableTableDemo extends React.Component<{}, ResizableTableDemoState> {
  constructor(props) {
    super(props);

    this.state = {
      resizedVals: new Map()
    };

    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(columnName, resizedColWidth) {
    const { resizedVals } = this.state;

    const newResizedVals = new Map(resizedVals);
    this.setState({
      resizedVals: newResizedVals.set(columnName, resizedColWidth)
    });
  }

  render() {
    const { resizedVals } = this.state;

    return (
      <div>
        <ul className={cx(listReset, padding("bottom"))}>
          <li>Name resized value: {resizedVals.get("name") || "unset"}</li>
          <li>Role resized value: {resizedVals.get("role") || "unset"}</li>
          <li>State resized value: {resizedVals.get("state") || "unset"}</li>
        </ul>
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
              resizable={true}
              onResize={this.handleResize.bind(null, "name")}
            />
            <Column
              header={<HeaderCell>role</HeaderCell>}
              cellRenderer={roleCellRenderer}
              resizable={true}
              onResize={this.handleResize.bind(null, "role")}
            />
            <Column
              header={<HeaderCell>state</HeaderCell>}
              cellRenderer={stateCellRenderer}
              resizable={true}
              onResize={this.handleResize.bind(null, "state")}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default ResizableTableDemo;
