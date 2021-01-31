import React from "react";
import { mount } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";
import { ToggleInputList } from "../";
import { InputAppearance } from "../../shared/types/inputAppearance";

const options = [
  { inputLabel: "Sample label", id: "id.1", value: "value.1" },
  { inputLabel: "Sample label", id: "id.2", value: "value.2" },
  { inputLabel: "Sample label", id: "id.3", value: "value.3" }
];

expect.addSnapshotSerializer(serializer);

describe("ToggleInputList", () => {
  it("renders default", () => {
    const component = mount(
      <ToggleInputList
        id="checkbox"
        items={options}
        listLabel="Sample legend"
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders as a radio group", () => {
    const component = mount(
      <ToggleInputList
        id="radio"
        items={options}
        listLabel="Sample legend"
        isRadioGroup={true}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with selected items", () => {
    const component = mount(
      <ToggleInputList
        id="checkbox"
        items={options}
        listLabel="Sample legend"
        selectedItems={["value.1", "value.2"]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with errors", () => {
    const component = mount(
      <ToggleInputList
        id="checkbox"
        items={options}
        listLabel="Sample legend"
        errors={["error.1", "error.2"]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with hidden label", () => {
    const component = mount(
      <ToggleInputList
        id="checkbox"
        items={options}
        listLabel="Sample legend"
        showListLabel={false}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with required", () => {
    const component = mount(
      <ToggleInputList
        id="checkbox"
        items={options}
        listLabel="Sample legend"
        required={true}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with error label appearance", () => {
    const component = mount(
      <ToggleInputList
        id="checkbox"
        items={options}
        listLabel="Sample legend"
        labelAppearance={InputAppearance.Error}
        errors={["error.1", "error.2"]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("calls onChange prop with all selected values and the last selected value", () => {
    const onChangeFn = jest.fn();
    const component = mount(
      <ToggleInputList
        id="checkbox"
        items={options}
        listLabel="Sample legend"
        onChange={onChangeFn}
      />
    );
    const checkbox = component.find("input").first();

    expect(onChangeFn).not.toHaveBeenCalled();
    checkbox.simulate("change", { target: { checked: true } });
    expect(onChangeFn).toHaveBeenCalledWith(
      [checkbox.prop("value")],
      checkbox.prop("value")
    );
    checkbox.simulate("change", { target: { checked: false } });
    expect(onChangeFn).toHaveBeenCalledWith([], checkbox.prop("value"));
  });
});
