import React from "react";
import { mount, shallow } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";

import { Textarea } from "../";
import { InputAppearance } from "../../shared/types/inputAppearance";

expect.addSnapshotSerializer(serializer);

describe("Textarea", () => {
  describe("should render", () => {
    it("all appearances", () => {
      Object.keys(InputAppearance).forEach(appearance => {
        const component = shallow(
          <Textarea
            id={InputAppearance[appearance]}
            inputLabel={InputAppearance[appearance]}
            appearance={InputAppearance[appearance]}
          />
        );
        expect(toJson(component)).toMatchSnapshot();
      });
    });
    it("string inputLabel", () => {
      const component = shallow(
        <Textarea id="textarea" inputLabel="Test Input" />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
    it("node as inputLabel", () => {
      const component = shallow(
        <Textarea id="textarea" inputLabel={<span>My Test Node</span>} />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
    it("with hidden label if `showInputLabel` is set to false", () => {
      const component = shallow(
        <Textarea
          id="textarea"
          inputLabel="I'm not displayed"
          showInputLabel={false}
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
    it("error messages if appearance set to InputAppearance.Error", () => {
      const component = shallow(
        <Textarea
          id="textarea"
          inputLabel="Error Message Test"
          appearance={InputAppearance.Error}
          errors={[
            "This is an error message",
            "this is a second error message"
          ]}
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
    it("no error messages if appearance set to InputAppearance.Success", () => {
      const component = shallow(
        <Textarea
          id="textarea"
          inputLabel="Error Message Test"
          appearance={InputAppearance.Success}
          errors={["I'm not displayed"]}
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });
  it("sets custom number of rows", () => {
    const rowCount = 5;
    const component = mount(
      <Textarea id="textarea" inputLabel="Custom rows" rows={rowCount} />
    );
    expect(component.find("textarea").prop("rows")).toEqual(rowCount);
  });
  it("should set <label>'s `for` attribute if `id` is set", () => {
    const testId = "testId";
    const component = mount(<Textarea id={testId} inputLabel="Custom rows" />);
    expect(component.find("label").prop("htmlFor")).toEqual(testId);
  });
  it("should call onFocus when input gains focus", () => {
    const focusFn = jest.fn();
    const component = mount(
      <Textarea id="textarea" inputLabel="Focus" onFocus={focusFn} />
    );
    expect(focusFn).not.toHaveBeenCalled();
    component.find("textarea").simulate("focus");
    expect(focusFn).toHaveBeenCalled();
  });
  it("should call onBlur when input loses focus", () => {
    const blurFn = jest.fn();
    const component = mount(
      <Textarea id="textarea" inputLabel="Blur" onBlur={blurFn} />
    );
    expect(blurFn).not.toHaveBeenCalled();
    component.find("textarea").simulate("focus");
    expect(blurFn).not.toHaveBeenCalled();
    component.find("textarea").simulate("blur");
    expect(blurFn).toHaveBeenCalled();
  });
  it("should call onChange when input changes", () => {
    const changeFn = jest.fn();
    const component = mount(
      <Textarea id="textarea" inputLabel="Change" onChange={changeFn} />
    );
    expect(changeFn).not.toHaveBeenCalled();
    component.find("textarea").simulate("change");
    expect(changeFn).toHaveBeenCalled();
  });
  it("should delegate onChange from parent form", () => {
    const changeFn = jest.fn();
    const component = mount(
      <form onChange={changeFn}>
        <Textarea id="textarea" inputLabel="Change" />
      </form>
    );
    expect(changeFn).not.toHaveBeenCalled();
    component.find("textarea").simulate("change");
    expect(changeFn).toHaveBeenCalled();
  });
});
