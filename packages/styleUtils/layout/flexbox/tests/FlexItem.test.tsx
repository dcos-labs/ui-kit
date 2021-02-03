import React from "react";
import { shallow } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";

import FlexItem from "../components/FlexItem";

expect.addSnapshotSerializer(createSerializer());

describe("FlexItem", () => {
  it("renders default", () => {
    const component = shallow(<FlexItem>content</FlexItem>);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with all props", () => {
    const component = shallow(
      <FlexItem flex="grow" growFactor={2} order={2}>
        content
      </FlexItem>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with responsive props", () => {
    const component = shallow(
      <FlexItem
        flex={{ default: "shrink", medium: "grow" }}
        growFactor={{ default: 1, medium: 2 }}
        order={{ default: 1, medium: 2 }}
      >
        content
      </FlexItem>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
