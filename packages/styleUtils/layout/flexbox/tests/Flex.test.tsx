import React from "react";
import { shallow } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";

import Flex from "../components/Flex";
import FlexItem from "../components/FlexItem";

expect.addSnapshotSerializer(createSerializer());

describe("Flex", () => {
  it("renders default", () => {
    const component = shallow(
      <Flex>
        <FlexItem>content</FlexItem>
        <FlexItem>content</FlexItem>
      </Flex>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with all props", () => {
    const component = shallow(
      <Flex
        align="center"
        justify="center"
        direction="column"
        wrap="nowrap"
        gutterSize="l"
      >
        <FlexItem>content</FlexItem>
        <FlexItem>content</FlexItem>
      </Flex>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with responsive props", () => {
    const component = shallow(
      <Flex
        align={{ default: "flex-start", medium: "center" }}
        justify={{ default: "flex-start", medium: "center" }}
        direction={{ default: "column", medium: "row" }}
        wrap={{ default: "wrap", medium: "nowrap" }}
        gutterSize={{ default: "s", medium: "m" }}
      >
        <FlexItem>content</FlexItem>
        <FlexItem>content</FlexItem>
      </Flex>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
