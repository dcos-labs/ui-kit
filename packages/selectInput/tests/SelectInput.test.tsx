import React from "react";
import { shallow, mount } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";
import { SelectInput } from "../";
import { InputAppearance } from "../../shared/types/inputAppearance";

expect.addSnapshotSerializer(createSerializer());

const defaultOptions = [
  { value: "exosphere", label: "Exosphere" },
  { value: "thermosphere", label: "Thermosphere" },
  { value: "mesosphere", label: "Mesosphere" },
  { value: "stratosphere", label: "Stratosphere" },
  { value: "troposphere", label: "Troposphere" },
  { value: "disabled", label: "Can't touch this", disabled: true }
];

describe("SelectInput", () => {
  it("renders all appearances", () => {
    Object.keys(InputAppearance).forEach(appearance => {
      const component = shallow(
        <SelectInput
          appearance={InputAppearance[appearance]}
          options={defaultOptions}
          id="layers"
          inputLabel="Atmosphere layer"
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  it("should render all appearances focus", () => {
    Object.keys(SelectInput).forEach(appearance => {
      const component = mount(
        <SelectInput
          appearance={SelectInput[appearance]}
          options={defaultOptions}
          id="layers"
          inputLabel="Atmosphere layer"
        />
      );
      component.find("select").simulate("focus");
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  it("renders with errors", () => {
    const component = shallow(
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        appearance={InputAppearance.Error}
        errors={["error1", "error2"]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders disabled", () => {
    const component = shallow(
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        disabled={true}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with hidden label", () => {
    const component = shallow(
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        showInputLabel={false}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("calls onFocus if its passed in as a prop", () => {
    const focusFn = jest.fn();
    const component = mount(
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        onFocus={focusFn}
      />
    );
    expect(focusFn).not.toHaveBeenCalled();
    component.find("select").simulate("focus");
    expect(focusFn).toHaveBeenCalled();
  });

  it("calls onBlur if its passed in as a prop", () => {
    const blurFn = jest.fn();
    const component = mount(
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        onBlur={blurFn}
      />
    );
    expect(blurFn).not.toHaveBeenCalled();
    component.find("select").simulate("focus");
    expect(blurFn).not.toHaveBeenCalled();
    component.find("select").simulate("blur");
    expect(blurFn).toHaveBeenCalled();
  });

  it("renders errors passed in when appearance === Error", () => {
    const errorList = ["error1", "error2"];
    const component = mount(
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        appearance={InputAppearance.Error}
        errors={errorList}
      />
    );
    expect(component.find("li").length).toBe(errorList.length);
  });

  it("does not render errors passed in when appearance !== Error", () => {
    const component = mount(
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        appearance={InputAppearance.Success}
        errors={["error1", "error2"]}
      />
    );
    expect(component.find("li").length).toBe(0);
  });
});
