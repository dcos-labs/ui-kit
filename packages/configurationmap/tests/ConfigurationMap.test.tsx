import React from "react";
import serializer from "@emotion/jest";
import { render, mount } from "enzyme";
import toJSON from "enzyme-to-json";

import {
  ConfigurationMap,
  ConfigurationMapSection,
  ConfigurationMapHeading,
  ConfigurationMapRow,
  ConfigurationMapLabel,
  ConfigurationMapValue,
  ConfigurationMapValueWithDefault,
  ConfigurationMapRowAction
} from "../";

expect.addSnapshotSerializer(serializer);

describe("ConfigurationMap", () => {
  it("renders default", () => {
    expect(
      toJSON(
        render(
          <ConfigurationMap>
            <ConfigurationMapSection>
              <ConfigurationMapRow>
                <ConfigurationMapLabel>Name</ConfigurationMapLabel>
                <ConfigurationMapValue>Jane Doe</ConfigurationMapValue>
              </ConfigurationMapRow>
              <ConfigurationMapRow>
                <ConfigurationMapLabel>Role</ConfigurationMapLabel>
                <ConfigurationMapValue>UX Designer</ConfigurationMapValue>
              </ConfigurationMapRow>
              <ConfigurationMapRow>
                <ConfigurationMapLabel>City</ConfigurationMapLabel>
                <ConfigurationMapValue>San Francisco</ConfigurationMapValue>
              </ConfigurationMapRow>
            </ConfigurationMapSection>
          </ConfigurationMap>
        )
      )
    ).toMatchSnapshot();
  });
  it("renders with headline", () => {
    expect(
      toJSON(
        render(
          <ConfigurationMap>
            <ConfigurationMapSection>
              <ConfigurationMapHeading>Jane Doe Info</ConfigurationMapHeading>
              <ConfigurationMapRow>
                <ConfigurationMapLabel>Name</ConfigurationMapLabel>
                <ConfigurationMapValue>Jane Doe</ConfigurationMapValue>
              </ConfigurationMapRow>
              <ConfigurationMapRow>
                <ConfigurationMapLabel>Role</ConfigurationMapLabel>
                <ConfigurationMapValue>UX Designer</ConfigurationMapValue>
              </ConfigurationMapRow>
              <ConfigurationMapRow>
                <ConfigurationMapLabel>City</ConfigurationMapLabel>
                <ConfigurationMapValue>San Francisco</ConfigurationMapValue>
              </ConfigurationMapRow>
            </ConfigurationMapSection>
          </ConfigurationMap>
        )
      )
    ).toMatchSnapshot();
  });
  it("renders with actions", () => {
    const rowActionCallback = jest.fn();
    expect(
      toJSON(
        render(
          <ConfigurationMap>
            <ConfigurationMapSection>
              <ConfigurationMapRow onlyShowActionOnHover={true}>
                <ConfigurationMapLabel>Name</ConfigurationMapLabel>
                <ConfigurationMapValue>Jane Doe</ConfigurationMapValue>
                <ConfigurationMapRowAction onClick={rowActionCallback}>
                  Action
                </ConfigurationMapRowAction>
              </ConfigurationMapRow>
              <ConfigurationMapRow onlyShowActionOnHover={true}>
                <ConfigurationMapLabel>Role</ConfigurationMapLabel>
                <ConfigurationMapValue>UX Designer</ConfigurationMapValue>
                <ConfigurationMapRowAction onClick={rowActionCallback}>
                  Action
                </ConfigurationMapRowAction>
              </ConfigurationMapRow>
              <ConfigurationMapRow onlyShowActionOnHover={true}>
                <ConfigurationMapLabel>City</ConfigurationMapLabel>
                <ConfigurationMapValue>San Francisco</ConfigurationMapValue>
                <ConfigurationMapRowAction onClick={rowActionCallback}>
                  Action
                </ConfigurationMapRowAction>
              </ConfigurationMapRow>
            </ConfigurationMapSection>
          </ConfigurationMap>
        )
      )
    ).toMatchSnapshot();
  });
  it("renders with default value", () => {
    expect(
      toJSON(
        render(
          <ConfigurationMap>
            <ConfigurationMapSection>
              <ConfigurationMapRow>
                <ConfigurationMapLabel>Name</ConfigurationMapLabel>
                <ConfigurationMapValueWithDefault value="Jane Doe" />
              </ConfigurationMapRow>
              <ConfigurationMapRow>
                <ConfigurationMapLabel>Role</ConfigurationMapLabel>
                <ConfigurationMapValueWithDefault />
              </ConfigurationMapRow>
              <ConfigurationMapRow>
                <ConfigurationMapLabel>City</ConfigurationMapLabel>
                <ConfigurationMapValueWithDefault />
              </ConfigurationMapRow>
            </ConfigurationMapSection>
          </ConfigurationMap>
        )
      )
    ).toMatchSnapshot();
  });
  it("calls onClick when action is clicked", () => {
    const rowActionCallback = jest.fn();
    const component = mount(
      <ConfigurationMap>
        <ConfigurationMapSection>
          <ConfigurationMapRow onlyShowActionOnHover={true}>
            <ConfigurationMapLabel>Name</ConfigurationMapLabel>
            <ConfigurationMapValue>Jane Doe</ConfigurationMapValue>
            <ConfigurationMapRowAction onClick={rowActionCallback}>
              Action
            </ConfigurationMapRowAction>
          </ConfigurationMapRow>
          <ConfigurationMapRow onlyShowActionOnHover={true}>
            <ConfigurationMapLabel>Role</ConfigurationMapLabel>
            <ConfigurationMapValue>UX Designer</ConfigurationMapValue>
            <ConfigurationMapRowAction onClick={rowActionCallback}>
              Action
            </ConfigurationMapRowAction>
          </ConfigurationMapRow>
          <ConfigurationMapRow onlyShowActionOnHover={true}>
            <ConfigurationMapLabel>City</ConfigurationMapLabel>
            <ConfigurationMapValue>San Francisco</ConfigurationMapValue>
            <ConfigurationMapRowAction onClick={rowActionCallback}>
              Action
            </ConfigurationMapRowAction>
          </ConfigurationMapRow>
        </ConfigurationMapSection>
      </ConfigurationMap>
    );
    const button = component.find("button").first();

    expect(rowActionCallback).not.toHaveBeenCalled();
    button.simulate("click");
    expect(rowActionCallback).toHaveBeenCalled();
  });
});
