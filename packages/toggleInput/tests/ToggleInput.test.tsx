import React from "react";
import { mount } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";
import { ToggleInput } from "../";
import { InputAppearance } from "../../shared/types/inputAppearance";

expect.addSnapshotSerializer(serializer);

describe("ToggleInput", () => {
  it("renders all appearances", () => {
    Object.keys(InputAppearance).forEach(appearance => {
      const component = mount(
        <ToggleInput
          id="defaultId"
          inputLabel="Sample label"
          value="default"
          appearance={InputAppearance[appearance]}
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });
  it("renders a checkbox input type", () => {
    const component = mount(
      <ToggleInput
        id="defaultId"
        inputLabel="Sample label"
        value="default"
        inputType="checkbox"
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders a radio input type", () => {
    const component = mount(
      <ToggleInput
        id="defaultId"
        inputLabel="Sample label"
        value="default"
        inputType="radio"
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it("calls onFocus if its passed in as a prop", () => {
    const focusFn = jest.fn();
    const component = mount(
      <ToggleInput
        id="defaultId"
        inputLabel="Sample label"
        value="default"
        onFocus={focusFn}
      />
    );
    expect(focusFn).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    expect(focusFn).toHaveBeenCalled();
  });

  it("calls onBlur if its passed in as a prop", () => {
    const blurFn = jest.fn();
    const component = mount(
      <ToggleInput
        id="defaultId"
        inputLabel="Sample label"
        value="default"
        onBlur={blurFn}
      />
    );
    expect(blurFn).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    expect(blurFn).not.toHaveBeenCalled();
    component.find("input").simulate("blur");
    expect(blurFn).toHaveBeenCalled();
  });
});
