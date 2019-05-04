import React from "react";
import { mount } from "enzyme";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
import toJson from "enzyme-to-json";
import { Typeahead, TextInput } from "../../index";
import DropdownContents from "../../dropdownable/components/DropdownContents";

expect.addSnapshotSerializer(createSerializer(emotion));

const items = [
  { label: "Exosphere", value: "Exosphere" },
  { label: "Thermosphere", value: "Thermosphere" },
  { label: "Stratosphere", value: "Stratosphere" }
];

describe("Typeahead", () => {
  it("renders", () => {
    const component = mount(
      <Typeahead
        items={items}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders a menu with a max height", () => {
    const component = mount(
      <Typeahead
        items={items}
        menuMaxHeight={100}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("opens the menu on focus", () => {
    const component = mount(
      <Typeahead
        items={[]}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );

    expect(component.find(DropdownContents).prop("open")).toBe(false);
    component.find("input").simulate("focus");
    expect(component.find(DropdownContents).prop("open")).toBe(true);
  });

  it("opens the menu on click even if it's focused", () => {
    const component = mount(
      <Typeahead
        items={items}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );

    expect(component.find(DropdownContents).prop("open")).toBe(false);
    component.find("input").simulate("focus");
    component.find("input").simulate("keyDown", {
      key: "ArrowDown"
    });
    component.find("input").simulate("keyDown", {
      key: "Enter"
    });
    // using `toBeFalsy` because DropdownContents is removed when `open` prop changes to false
    expect(component.find(DropdownContents).prop("open")).toBeFalsy();
    component.find("input").simulate("click");
    expect(component.find(DropdownContents).prop("open")).toBe(true);
  });

  it("renders an empty state if no items are passed", () => {
    const component = mount(
      <Typeahead
        items={[]}
        menuEmptyState={<div id="emptyState">Empty</div>}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );

    component.find("input").simulate("focus");
    expect(component.find("#emptyState").exists()).toBe(true);
  });

  it("does not render an empty state if items are passed", () => {
    const component = mount(
      <Typeahead
        items={items}
        menuEmptyState={<div id="emptyState">Empty</div>}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );

    component.find("input").simulate("focus");
    expect(component.find("#emptyState").exists()).toBe(false);
  });

  it("renders whatever text input field that is passed", () => {
    const component = mount(
      <Typeahead items={items} textField={<input id="randomInput" />} />
    );

    expect(component.find("#randomInput").exists()).toBe(true);
  });

  it("calls onSelect prop with the selected values", () => {
    const onSelectFn = jest.fn();
    const component = mount(
      <Typeahead
        items={items}
        onSelect={onSelectFn}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );
    const input = component.find("input");

    input.simulate("focus");
    expect(onSelectFn).not.toHaveBeenCalled();
    input.simulate("keyDown", {
      key: "ArrowDown"
    });
    input.simulate("keyDown", {
      key: "Enter"
    });
    expect(onSelectFn).toHaveBeenCalledWith([items[0].value]);
  });

  it("sets the input value to the selected item's value on change", () => {
    const onSelectFn = jest.fn();
    const component = mount(
      <Typeahead
        items={items}
        onSelect={onSelectFn}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );
    expect(component.find("input").prop("value")).toBe("");
    component.find("input").simulate("focus");
    expect(onSelectFn).not.toHaveBeenCalled();
    component.find("input").simulate("keyDown", {
      key: "ArrowDown"
    });
    component.find("input").simulate("keyDown", {
      key: "Enter"
    });
    expect(component.find("input").prop("value")).toBe(items[0].value);
  });

  it("does not hide the dropdown when selecting an item if multiSelect is true", () => {
    const onSelectFn = jest.fn();
    const component = mount(
      <Typeahead
        multiSelect={true}
        items={items}
        onSelect={onSelectFn}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );

    expect(component.find(DropdownContents).prop("open")).toBe(false);
    component.find("input").simulate("focus");
    expect(onSelectFn).not.toHaveBeenCalled();
    component.find("input").simulate("keyDown", {
      key: "ArrowDown"
    });
    component.find("input").simulate("keyDown", {
      key: "Enter"
    });
    expect(component.find(DropdownContents).prop("open")).toBe(true);
  });

  it("does not set the input value if multiSelect is true", () => {
    const onSelectFn = jest.fn();
    const component = mount(
      <Typeahead
        multiSelect={true}
        items={items}
        onSelect={onSelectFn}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
          />
        }
      />
    );

    expect(component.find("input").prop("value")).toBe("");
    component.find("input").simulate("focus");
    expect(onSelectFn).not.toHaveBeenCalled();
    component.find("input").simulate("keyDown", {
      key: "ArrowDown"
    });
    component.find("input").simulate("keyDown", {
      key: "Enter"
    });
    expect(component.find("input").prop("value")).toBe("");
  });

  it("calls the input's onClick prop", () => {
    const onClickFn = jest.fn();
    const component = mount(
      <Typeahead
        items={items}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
            onClick={onClickFn}
          />
        }
      />
    );

    expect(component.find("input").prop("value")).toBe("");
    expect(onClickFn).not.toHaveBeenCalled();
    component.find("input").simulate("click");
    expect(onClickFn).toHaveBeenCalled();
  });

  it("calls the input's onFocus prop", () => {
    const onFocusFn = jest.fn();
    const component = mount(
      <Typeahead
        items={items}
        textField={
          <TextInput
            id="standard.input"
            inputLabel="Standard"
            placeholder="Placeholder"
            onFocus={onFocusFn}
          />
        }
      />
    );

    expect(component.find("input").prop("value")).toBe("");
    expect(onFocusFn).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    expect(onFocusFn).toHaveBeenCalled();
  });
});
