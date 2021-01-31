import React from "react";
import { shallow, mount } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";
import { PrimaryAction, SecondaryAction } from "../stories/helpers/actions";
import { InfoBox, InfoBoxBanner, InfoBoxInline } from "../";

expect.addSnapshotSerializer(serializer);

const MessageComponent = (): JSX.Element => {
  return <span>message</span>;
};

describe("InfoBox", () => {
  it("renders default", () => {
    const dismissFn = jest.fn();
    const component = shallow(
      <InfoBox message="message" onDismiss={dismissFn} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with JSX message", () => {
    const dismissFn = jest.fn();
    const component = shallow(
      <InfoBox message={<MessageComponent />} onDismiss={dismissFn} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with actions", () => {
    const dismissFn = jest.fn();
    const component = shallow(
      <InfoBox
        message="message"
        primaryAction={<PrimaryAction />}
        secondaryAction={<SecondaryAction />}
        onDismiss={dismissFn}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders without dismiss button", () => {
    const component = shallow(<InfoBox message="message" />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("calls onDismiss when clicking dismiss node", () => {
    const dismissFn = jest.fn();
    const component = mount(
      <InfoBox message="message" onDismiss={dismissFn} />
    );
    const dismissBtn = component.find("span[role='button']");

    expect(dismissFn).not.toHaveBeenCalled();
    dismissBtn.simulate("click");
    expect(dismissFn).toHaveBeenCalled();
  });

  describe("InfoBoxBanner", () => {
    it("renders default", () => {
      const dismissFn = jest.fn();
      const component = shallow(
        <InfoBoxBanner message="message" onDismiss={dismissFn} />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("InfoBoxInline", () => {
    const dismissFn = jest.fn();
    const component = shallow(
      <InfoBoxInline message="message" onDismiss={dismissFn} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
