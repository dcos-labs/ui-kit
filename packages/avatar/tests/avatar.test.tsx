import React from "react";
import { shallow } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";

expect.addSnapshotSerializer(createSerializer());

import { Avatar } from "..";
import { serviceImg } from "../stories/helpers/serviceImg";

describe("Avatar", () => {
  it("renders default", () => {
    const component = shallow(<Avatar src="" />);
    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with a src, size, and label", () => {
    const component = shallow(
      <Avatar src={serviceImg} label="Kubernetes" size="xl" />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
