import React from "react";
import { mount } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";
import { Tooltip } from "../";
import Dropdownable, {
  Direction
} from "../../dropdownable/components/Dropdownable";

expect.addSnapshotSerializer(serializer);

describe("Tooltip", () => {
  it("renders", () => {
    const component = mount(
      <Tooltip id="renders" trigger="trigger">
        content
      </Tooltip>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders open tooltip", () => {
    const component = mount(
      <Tooltip id="opened" trigger="trigger" isOpen={true}>
        content
      </Tooltip>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with preferred directions", () => {
    const component = mount(
      <Tooltip
        id="customDir"
        trigger="trigger"
        isOpen={true}
        preferredDirections={[Direction.BottomLeft]}
      >
        content
      </Tooltip>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("passes isOpen={true} to Dropdownable on mouseOver", () => {
    const component = mount(
      <Tooltip id="hoverOpen" trigger="trigger">
        content
      </Tooltip>
    );

    expect(component.find(Dropdownable).prop("isOpen")).toBe(false);
    component.simulate("mouseOver");
    expect(component.find(Dropdownable).prop("isOpen")).toBe(true);
  });

  it("passes isOpen={false} to Dropdownable on mouseLeave", () => {
    const component = mount(
      <Tooltip id="hoverOpen" trigger="trigger" isOpen={true}>
        content
      </Tooltip>
    );
    expect(component.find(Dropdownable).prop("isOpen")).toBe(true);
    component.simulate("mouseLeave");
    expect(component.find(Dropdownable).prop("isOpen")).toBe(false);
  });

  it("does not pass a different value to Dropdownable's 'isOpen' prop on mouseEnter if suppress is true", () => {
    const component = mount(
      <Tooltip id="hoverOpen" trigger="trigger" suppress={true}>
        content
      </Tooltip>
    );
    expect(component.find(Dropdownable).prop("isOpen")).toBeFalsy();
    component.simulate("mouseEnter");
    expect(component.find(Dropdownable).prop("isOpen")).toBeFalsy();
  });

  it("calls onClose prop when closed", () => {
    const handleClose = jest.fn();

    const component = mount(
      <Tooltip id="hoverOpen" trigger="trigger" onClose={handleClose}>
        content
      </Tooltip>
    );

    component.simulate("mouseEnter");
    component.simulate("mouseLeave");
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
