import React from "react";
import { shallow } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";

import { BorderedList } from "../";

expect.addSnapshotSerializer(serializer);

describe("BorderedList", () => {
  it("renders default", () => {
    const component = shallow(
      <BorderedList tag="ul">
        <li>list item</li>
        <li>list item</li>
      </BorderedList>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
