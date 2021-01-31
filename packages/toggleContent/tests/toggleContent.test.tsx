import React from "react";
import serializer from "@emotion/jest";
import { mount, render } from "enzyme";
import toJson from "enzyme-to-json";

import { ToggleContent } from "../";

expect.addSnapshotSerializer(serializer);

const primary = () => <div>primary</div>;
const secondary = () => <div>secondary</div>;

describe("ToggleContent", () => {
  beforeEach(() => {
    const mock = jest.fn();
    mock.mockReturnValue({
      toString: jest.fn()
    });
    window.getSelection = mock;
  });

  it("renders a div wrapping the content passed as props", () => {
    expect(
      toJson(
        render(
          <ToggleContent tabIndex="0" contentOn="Hello" contentOff="Bye" />
        )
      )
    ).toMatchSnapshot();
  });

  it("string content", () => {
    const wrapper = mount(<ToggleContent contentOn="Hello" contentOff="Bye" />);

    expect(
      wrapper
        .last()
        .children()
        .last()
        .text()
    ).toEqual("Hello");

    wrapper.simulate("click");

    expect(
      wrapper
        .last()
        .children()
        .last()
        .text()
    ).toEqual("Bye");
  });

  it("component content", () => {
    const wrapper = mount(
      <ToggleContent contentOn={primary()} contentOff={secondary()} />
    );

    expect(
      wrapper
        .last()
        .children()
        .last()
        .text()
    ).toEqual("primary");

    wrapper.simulate("click");

    expect(
      wrapper
        .last()
        .children()
        .last()
        .text()
    ).toEqual("secondary");
  });
});
