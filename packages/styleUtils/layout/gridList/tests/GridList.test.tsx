import React from "react";
import { shallow } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";

import GridList from "../components/GridList";

expect.addSnapshotSerializer(serializer);

describe("GridList", () => {
  it("renders default", () => {
    const component = shallow(
      <GridList columnCount={2} tag="ul">
        <li>list item</li>
        <li>list item</li>
      </GridList>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with all props", () => {
    const component = shallow(
      <GridList columnCount={2} gutterSize="l" tag="ol">
        <li>list item</li>
        <li>list item</li>
      </GridList>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with responsive props", () => {
    const component = shallow(
      <GridList
        columnCount={{ default: 1, medium: 2 }}
        gutterSize={{ default: "s", medium: "m" }}
        tag="ul"
      >
        <li>list item</li>
        <li>list item</li>
      </GridList>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
