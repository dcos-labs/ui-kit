import React from "react";
import { createSerializer } from "@emotion/jest";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import TextInputWithBadges, {
  getStringAsBadgeDatum
} from "../components/TextInputWithBadges";

expect.addSnapshotSerializer(createSerializer());

const defaultBadges = [
  {
    label: "Badge one",
    value: "badge-one"
  },
  {
    label: "Badge two",
    value: "badge-two"
  },
  {
    label: "Badge three",
    value: "badge-three"
  }
];

describe("TextInputWithBadges", () => {
  it("renders empty", () => {
    const component = mount(
      <TextInputWithBadges id="empty" inputLabel="empty" />
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with badges", () => {
    const component = mount(
      <TextInputWithBadges
        id="withBadges"
        inputLabel="With badges"
        badges={defaultBadges}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders badges with custom BadgeAppearance", () => {
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        badges={defaultBadges}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("calls onBadgeChange with the badge data and input value when keying enter", () => {
    const badgeChangeHandler = jest.fn();
    const inputValue = "some value";
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        value={inputValue}
        onBadgeChange={badgeChangeHandler}
      />
    );

    expect(badgeChangeHandler).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    component.find("input").simulate("keyUp", {
      key: "Enter"
    });

    expect(badgeChangeHandler).toHaveBeenCalledWith(
      [getStringAsBadgeDatum(inputValue)],
      getStringAsBadgeDatum(inputValue)
    );
  });

  it("calls onBadgeChange with the badge data and input value when the input blurs", () => {
    const badgeChangeHandler = jest.fn();
    const inputValue = "some value";
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        value={inputValue}
        onBadgeChange={badgeChangeHandler}
      />
    );

    expect(badgeChangeHandler).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    component.find("input").simulate("blur");

    expect(badgeChangeHandler).toHaveBeenCalledWith(
      [getStringAsBadgeDatum(inputValue)],
      getStringAsBadgeDatum(inputValue)
    );
  });

  it("does not call onBadgeChange with the badge data and input value when the input blurs if addBadgeOnBlur=false", () => {
    const badgeChangeHandler = jest.fn();
    const inputValue = "some value";
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        value={inputValue}
        onBadgeChange={badgeChangeHandler}
        addBadgeOnBlur={false}
      />
    );

    expect(badgeChangeHandler).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    component.find("input").simulate("blur");

    expect(badgeChangeHandler).not.toHaveBeenCalledWith(
      [getStringAsBadgeDatum(inputValue)],
      getStringAsBadgeDatum(inputValue)
    );
  });

  it("does not call onBadgeChange when keying enter if the input value is undefined", () => {
    const badgeChangeHandler = jest.fn();
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        onBadgeChange={badgeChangeHandler}
      />
    );

    expect(badgeChangeHandler).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    component.find("input").simulate("keyDown", {
      key: "Enter"
    });
    expect(badgeChangeHandler).not.toHaveBeenCalled();
  });

  it("does not call onBadgeChange when keying enter if the input value is whitespace chars", () => {
    const badgeChangeHandler = jest.fn();
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        value=" "
        onBadgeChange={badgeChangeHandler}
      />
    );

    expect(badgeChangeHandler).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    component.find("input").simulate("keyDown", {
      key: "Enter"
    });
    expect(badgeChangeHandler).not.toHaveBeenCalled();
  });

  it("calls onBadgeChange with the badge data when clicking the close icon", () => {
    const firstBadge = { value: "firstbadge", label: "First badge" };
    const badgeChangeHandler = jest.fn();
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        badges={[firstBadge, ...defaultBadges]}
        onBadgeChange={badgeChangeHandler}
      />
    );

    expect(badgeChangeHandler).not.toHaveBeenCalled();
    component
      .find('[data-cy="badge"]')
      .first()
      .find('[aria-label="system-close icon"]')
      .simulate("click");
    expect(badgeChangeHandler).toHaveBeenCalledWith(defaultBadges, firstBadge);
  });

  it("calls onBadgeChange with the last badge's data when keying backspace", () => {
    const lastBadge = { value: "lastbadge", label: "Last badge" };
    const badgeChangeHandler = jest.fn();
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        badges={[...defaultBadges, lastBadge]}
        onBadgeChange={badgeChangeHandler}
      />
    );

    expect(badgeChangeHandler).not.toHaveBeenCalled();
    component.find("input").simulate("focus");
    component.find("input").simulate("keyDown", {
      key: "Backspace"
    });
    expect(badgeChangeHandler).toHaveBeenCalledWith(defaultBadges, lastBadge);
  });

  it("calls the input's onKeyDown prop", () => {
    const onKeyDownFn = jest.fn();
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        onKeyDown={onKeyDownFn}
      />
    );

    expect(onKeyDownFn).not.toHaveBeenCalled();
    component.find("input").simulate("keyDown", {
      key: "Space"
    });
    expect(onKeyDownFn).toHaveBeenCalled();
  });

  it("calls the input's onKeyUp prop", () => {
    const onKeyUpFn = jest.fn();
    const component = mount(
      <TextInputWithBadges
        id="appearance"
        inputLabel="Appearance"
        onKeyUp={onKeyUpFn}
      />
    );

    expect(onKeyUpFn).not.toHaveBeenCalled();
    component.find("input").simulate("keyUp", {
      key: "Space"
    });
    expect(onKeyUpFn).toHaveBeenCalled();
  });
});
