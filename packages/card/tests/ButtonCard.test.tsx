import React from "react";
import { mount } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";

import { ButtonCard } from "../";

expect.addSnapshotSerializer(createSerializer());

describe("ButtonCard", () => {
  it("renders default", () => {
    const component = mount(<ButtonCard>default</ButtonCard>);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders as isActive", () => {
    const component = mount(<ButtonCard isActive={true}>default</ButtonCard>);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders as disabled", () => {
    const component = mount(<ButtonCard disabled={true}>default</ButtonCard>);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders as hasFocus", () => {
    const component = mount(<ButtonCard hasFocus={true}>default</ButtonCard>);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("does not pass accessibility props if isInput is true", () => {
    const accessibilityProps = [
      "tabIndex",
      "role",
      "aria-disabled",
      "aria-pressed"
    ];
    const component = mount(<ButtonCard isInput={true}>default</ButtonCard>);
    const buttonCardNodeProps = component
      .find("[data-cy='buttonCard']")
      .props();
    const propKeys = Object.keys(buttonCardNodeProps).map(key => key);

    accessibilityProps.forEach(prop => {
      expect(propKeys.includes(prop)).toBe(false);
    });
    // expect(toJson(component)).toMatchSnapshot();
  });
});
