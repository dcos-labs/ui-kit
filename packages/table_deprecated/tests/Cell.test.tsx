import * as React from "react";
import { createSerializer } from "@emotion/jest";
import { render } from "enzyme";
import toJson from "enzyme-to-json";

import Cell from "../components/Cell";
import HeaderCell from "../components/HeaderCell";
import TextCell from "../components/TextCell";

expect.addSnapshotSerializer(createSerializer());

describe("Cell", () => {
  it("renders correctly", () => {
    expect(toJson(render(<Cell>This is content</Cell>))).toMatchSnapshot();
  });
});

describe("HeaderCell", () => {
  it("renders correctly", () => {
    expect(
      toJson(render(<HeaderCell>This is content</HeaderCell>))
    ).toMatchSnapshot();
  });
});

describe("TextCell", () => {
  it("renders correctly", () => {
    expect(
      toJson(render(<TextCell>This is content</TextCell>))
    ).toMatchSnapshot();
  });
});
