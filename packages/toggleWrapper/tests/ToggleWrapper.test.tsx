import React from "react";
import { mount } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";

import { ToggleWrapper } from "../";

expect.addSnapshotSerializer(serializer);

describe("ToggleWrapper", () => {
  it("renders", () => {
    const component = mount(
      <ToggleWrapper isActive={true}>
        {({ isActive }) => <div>{`isActive? ${isActive}`}</div>}
      </ToggleWrapper>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders as a radio input", () => {
    const component = mount(
      <ToggleWrapper type="radio" isActive={true}>
        {({ isActive }) => <div>{`isActive? ${isActive}`}</div>}
      </ToggleWrapper>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("calls onFocus prop when the input gets focus", () => {
    const focusFn = jest.fn();
    const component = mount(
      <ToggleWrapper isActive={true} onFocus={focusFn}>
        {({ isActive }) => <div>{`isActive? ${isActive}`}</div>}
      </ToggleWrapper>
    );

    expect(focusFn).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    expect(focusFn).toHaveBeenCalled();
  });
  it("calls onBlur prop when the input loses focus", () => {
    const blurFn = jest.fn();
    const component = mount(
      <ToggleWrapper isActive={true} onBlur={blurFn}>
        {({ isActive }) => <div>{`isActive? ${isActive}`}</div>}
      </ToggleWrapper>
    );

    expect(blurFn).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    expect(blurFn).not.toHaveBeenCalled();
    component.find("input").simulate("blur");
    expect(blurFn).toHaveBeenCalled();
  });
});
