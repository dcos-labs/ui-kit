import React from "react";
import { shallow, mount } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";

import {
  Sidebar,
  SidebarItem,
  SidebarItemLabel,
  SidebarSection,
  SidebarSubMenuItem
} from "../";
import {
  SidebarSubMenuComponent,
  getSubItemList
} from "../components/SidebarSubMenu";
import { ProductIcons } from "../../icons/dist/product-icons-enum";

expect.addSnapshotSerializer(createSerializer());

describe("Sidebar", () => {
  it("renders", () => {
    const component = shallow(<Sidebar isOpen={true}>Sidebar content</Sidebar>);
    expect(toJson(component)).toMatchSnapshot();
  });
  it("calls onOpen callback", () => {
    const onOpenFn = jest.fn();
    const component = mount(
      <Sidebar isOpen={false} onOpen={onOpenFn}>
        Sidebar content
      </Sidebar>
    );
    expect(onOpenFn).not.toHaveBeenCalled();
    component.setProps({ isOpen: true });
    expect(onOpenFn).toHaveBeenCalled();
  });
  it("calls onClose callback", () => {
    const onCloseFn = jest.fn();
    const component = mount(
      <Sidebar isOpen={true} onClose={onCloseFn}>
        Sidebar content
      </Sidebar>
    );
    expect(onCloseFn).not.toHaveBeenCalled();
    component.setProps({ isOpen: false });
    expect(onCloseFn).toHaveBeenCalled();
  });

  describe("SidebarSection", () => {
    it("renders", () => {
      const component = shallow(
        <SidebarSection label="Label">
          <div>Sidebar section content</div>
        </SidebarSection>
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("SidebarItem", () => {
    it("renders", () => {
      const onClickFn = jest.fn();
      const component = shallow(
        <Sidebar isOpen={true}>
          <SidebarItem
            icon={ProductIcons.ComponentsInverse}
            onClick={onClickFn}
            url="http://google.com"
            openInNewTab={true}
          >
            Item label
          </SidebarItem>
        </Sidebar>
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("SidebarItemLabel", () => {
    it("renders", () => {
      const component = shallow(
        <SidebarItemLabel icon={ProductIcons.ComponentsInverse}>
          Item label
        </SidebarItemLabel>
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("SidebarSubMenu", () => {
    const onClickFn = jest.fn();
    // tslint:disable:jsx-wrap-multiline
    const subMenuItems = [
      <SidebarSubMenuItem
        key={0}
        onClick={onClickFn}
        url="http://google.com"
        openInNewTab={true}
      >
        Item label
      </SidebarSubMenuItem>,
      <SidebarSubMenuItem
        key={1}
        onClick={onClickFn}
        url="http://google.com"
        openInNewTab={true}
      >
        Item label
      </SidebarSubMenuItem>
    ];
    // tslint:enable
    const component = shallow(
      <SidebarSubMenuComponent
        label={
          <SidebarItemLabel icon={ProductIcons.ComponentsInverse}>
            Item label
          </SidebarItemLabel>
        }
      >
        {subMenuItems}
      </SidebarSubMenuComponent>
    );
    it("renders", () => {
      expect(toJson(component)).toMatchSnapshot();
    });
    it("makes a list of submenu items", () => {
      const subItemResult = getSubItemList(subMenuItems);
      expect(subItemResult.props.children.length).toBe(2);
    });
  });

  describe("SidebarSubMenuItem", () => {
    it("renders", () => {
      const component = shallow(
        <SidebarItemLabel icon={ProductIcons.ComponentsInverse}>
          Item label
        </SidebarItemLabel>
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
