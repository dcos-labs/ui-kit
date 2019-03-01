import * as React from "react";
import { jsx } from "@emotion/core";

import Cell from "../components/Cell";
import HeaderCell from "../components/HeaderCell";
import TextCell from "../components/TextCell";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
import { render } from "enzyme";
import toJson from "enzyme-to-json";

expect.addSnapshotSerializer(createSerializer(emotion));

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
