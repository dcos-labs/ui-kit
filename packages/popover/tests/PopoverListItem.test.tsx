import React from "react";
import { shallow } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";
import PopoverListItem from "../components/PopoverListItem";
import { PopoverListItemAppearances } from "../../shared/types/popoverListItemAppearances";
import PopoverListItemIcon from "../components/PopoverListItemIcon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import PopoverListItemAvatar from "../components/PopoverListItemAvatar";

expect.addSnapshotSerializer(createSerializer());

describe("PopoverListItem", () => {
  it("renders", () => {
    const component = shallow(
      <PopoverListItem index={0} listLength={1}>
        item content content
      </PopoverListItem>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders disabled", () => {
    const component = shallow(
      <PopoverListItem index={0} listLength={1} disabled={true}>
        item content content
      </PopoverListItem>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders active", () => {
    const component = shallow(
      <PopoverListItem index={0} listLength={1} isActive={true}>
        item content content
      </PopoverListItem>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders all appearances", () => {
    Object.keys(PopoverListItemAppearances).forEach(appearance => {
      const component = shallow(
        <PopoverListItem
          index={0}
          listLength={1}
          isSelected={true}
          appearance={PopoverListItemAppearances[appearance]}
        >
          item content content
        </PopoverListItem>
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });
  it("renders selected", () => {
    const component = shallow(
      <PopoverListItem index={0} listLength={1} isSelected={true}>
        item content content
      </PopoverListItem>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders active and selected", () => {
    const component = shallow(
      <PopoverListItem
        index={0}
        listLength={1}
        isSelected={true}
        isActive={true}
      >
        item content content
      </PopoverListItem>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with icon and avatar", () => {
    const component = shallow(
      <PopoverListItem index={0} listLength={1}>
        <PopoverListItemIcon shape={SystemIcons.ArrowDown} />
        item content content
        <PopoverListItemAvatar src="" />
      </PopoverListItem>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
