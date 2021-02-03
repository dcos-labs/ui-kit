import React from "react";
import { shallow } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";
import { BorderedBox } from "../";

expect.addSnapshotSerializer(createSerializer());

describe("BorderedBox", () => {
  it("renders default", () => {
    const component = shallow(
      <BorderedBox tag="div" side="all">
        Content
      </BorderedBox>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with all props", () => {
    const component = shallow(
      <BorderedBox tag="div" side="top" radius="small" variant="heavy">
        Content
      </BorderedBox>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
