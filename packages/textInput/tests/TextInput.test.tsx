import * as React from "react";
import serializer from "@emotion/jest";
import { shallow, mount, render } from "enzyme";
import toJson from "enzyme-to-json";
// tslint:disable:no-duplicate-imports
import { css, cx } from "@emotion/css";

import TextInput from "../components/TextInput";
import { InputAppearance } from "../../shared/types/inputAppearance";

expect.addSnapshotSerializer(serializer);

describe("TextInput", () => {
  it("should render all appearances with props", () => {
    Object.keys(InputAppearance).forEach(appearance => {
      const component = shallow(
        <TextInput
          id={`test.input.${InputAppearance[appearance]}`}
          inputLabel={InputAppearance[appearance]}
          appearance={InputAppearance[appearance]}
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  it("should render all appearances focus", () => {
    Object.keys(InputAppearance).forEach(appearance => {
      const component = mount(
        <TextInput id="test.input" appearance={InputAppearance[appearance]} />
      );
      component.find("input").simulate("focus");
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  it("should render string inputLabel", () => {
    const component = shallow(
      <TextInput id="test.input" inputLabel="Test Input" />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render node as inputLabel", () => {
    const component = shallow(
      <TextInput id="test.input" inputLabel={<span>My Test Node</span>} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should id attribute to input element", () => {
    const inputId = "test.input.0";
    const component = mount(<TextInput id={inputId} />);
    expect(component.find("input").prop("id")).toEqual(inputId);
  });

  it("should set label `for` attribute if input id set", () => {
    const inputId = "test.input.0";
    const component = shallow(
      <TextInput id={inputId} inputLabel="Test Input" />
    );
    expect(component.find("label").prop("htmlFor")).toEqual(inputId);
  });

  it("should set tabIndex on input element", () => {
    const component = mount(<TextInput id="test.input" tabIndex={2} />);
    expect(component.find("input").prop("tabIndex")).toEqual(2);
  });

  it("should call onFocus when input gains focus", () => {
    const focusFn = jest.fn();
    const component = mount(<TextInput id="test.input" onFocus={focusFn} />);
    expect(focusFn).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    expect(focusFn).toHaveBeenCalled();
  });

  it("should call onBlur when input loses focus", () => {
    const blurFn = jest.fn();
    const component = mount(<TextInput id="test.input" onBlur={blurFn} />);
    expect(blurFn).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    expect(blurFn).not.toHaveBeenCalled();
    component.find("input").simulate("blur");
    expect(blurFn).toHaveBeenCalled();
  });

  it("should call onChange when input changes", () => {
    const changeFn = jest.fn();
    const component = mount(<TextInput id="test.input" onChange={changeFn} />);
    expect(changeFn).not.toHaveBeenCalled();
    component.find("input").simulate("change");
    expect(changeFn).toHaveBeenCalled();
  });

  it("should pass className to container div", () => {
    const widthTest = css`
      width: 200px;
    `;
    const component = shallow(<TextInput id="1" className={cx(widthTest)} />);
    expect(
      component
        .find("div")
        .first()
        .props().className
    ).toEqual(widthTest);
  });

  it("should hide label if `showInputLabel` set to false", () => {
    const component = shallow(
      <TextInput
        id="input.with.hidden.label"
        inputLabel="I'm not displayed"
        showInputLabel={false}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should display validation message if set & appearance == Error", () => {
    const component = shallow(
      <TextInput
        id="input.error.with.message"
        inputLabel="Error Message Test"
        appearance={InputAppearance.Error}
        errors={["This is an error message", "this is a second error message"]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should not display validation message if set & appearance == Success", () => {
    const component = shallow(
      <TextInput
        id="input.success.without.message"
        inputLabel="No Error Message Test"
        appearance={InputAppearance.Success}
        errors={["This is an error message"]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should display icon with tooltip if tooltipText is set", () => {
    const component = shallow(
      <TextInput
        id="input.with.tooltip"
        inputLabel="Tooltip Message Test"
        tooltipContent="Example Tooltip"
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should generate an ID if one is not passed", () => {
    const component = render(<TextInput inputLabel="Test Input" />);
    // const textInputId = component.find("input").prop("id");
    // console.log(`textInputId: ${textInputId}`);
    expect(component.find("input").prop("id")).toBeDefined();
  });
});
