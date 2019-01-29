import React from "react";
import { mount } from "enzyme";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
import toJson from "enzyme-to-json";
import { CheckboxInput } from "../";
import { ToggleInputAppearance } from "../../toggleInput/components/ToggleInput";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("CheckboxInput", () => {
  it("renders all appearances", () => {
    Object.keys(ToggleInputAppearance).forEach(appearance => {
      const component = mount(
        <CheckboxInput
          id="defaultId"
          inputLabel="Sample label"
          value="default"
          appearance={ToggleInputAppearance[appearance]}
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  it("renders with a hidden label", () => {
    const component = mount(
      <CheckboxInput
        id="defaultId"
        inputLabel="Sample label"
        showInputLabel={false}
        value="default"
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("calls onFocus if its passed in as a prop", () => {
    const focusFn = jest.fn();
    const component = mount(
      <CheckboxInput
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
      <CheckboxInput
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