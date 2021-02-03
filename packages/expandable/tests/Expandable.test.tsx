import React from "react";
import { mount } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";

import { Expandable } from "../";

expect.addSnapshotSerializer(createSerializer());

describe("Sidebar", () => {
  it("renders", () => {
    const component = mount(
      <Expandable label="Label" isOpen={true}>
        Content
      </Expandable>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it("toggles open and closed", () => {
    const component = mount(
      <Expandable label="Label" isOpen={true}>
        Content
      </Expandable>
    );

    expect(component.find("button").props()["aria-expanded"]).toBe(true);
    component.find("button").simulate("click");
    expect(component.find("button").props()["aria-expanded"]).toBe(false);
  });
});
