import React from "react";
import { createSerializer } from "@emotion/jest";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { SegmentedControl, SegmentedControlButton } from "../";

expect.addSnapshotSerializer(createSerializer());

describe("SegmentedControl", () => {
  it("renders default", () => {
    const component = shallow(
      <SegmentedControl id="controlId">
        <SegmentedControlButton value="one">One</SegmentedControlButton>
        <SegmentedControlButton value="two">Two</SegmentedControlButton>
        <SegmentedControlButton value="three">Three</SegmentedControlButton>
      </SegmentedControl>
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with selected", () => {
    const component = shallow(
      <SegmentedControl id="controlId" selectedSegment="one">
        <SegmentedControlButton value="one">One</SegmentedControlButton>
        <SegmentedControlButton value="two">Two</SegmentedControlButton>
        <SegmentedControlButton value="three">Three</SegmentedControlButton>
      </SegmentedControl>
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders buttons with ID prop when it is passed", () => {
    const component = mount(
      <SegmentedControl id="controlId">
        <SegmentedControlButton id="btnOne" value="one">
          One
        </SegmentedControlButton>
        <SegmentedControlButton id="btnTwo" value="two">
          Two
        </SegmentedControlButton>
        <SegmentedControlButton id="btnThree" value="three">
          Three
        </SegmentedControlButton>
      </SegmentedControl>
    );
    const labelForProp = component
      .find("label")
      .first()
      .prop("htmlFor");
    const inputIdProp = component
      .find("input")
      .first()
      .prop("id");

    expect(labelForProp).toBe("btnOne");
    expect(inputIdProp).toBe("btnOne");
    expect(inputIdProp).toBe(labelForProp);
  });

  it("renders buttons with generated ID prop", () => {
    const component = mount(
      <SegmentedControl id="controlId">
        <SegmentedControlButton value="one">One</SegmentedControlButton>
        <SegmentedControlButton value="two">Two</SegmentedControlButton>
        <SegmentedControlButton value="three">Three</SegmentedControlButton>
      </SegmentedControl>
    );
    const labelForProp = component
      .find("label")
      .first()
      .prop("htmlFor");
    const inputIdProp = component
      .find("input")
      .first()
      .prop("id");

    expect(typeof labelForProp).toBe("string");
    expect(typeof inputIdProp).toBe("string");
    expect(inputIdProp).toBe(labelForProp);
  });
});
