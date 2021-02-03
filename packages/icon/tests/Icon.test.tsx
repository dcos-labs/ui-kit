import React from "react";
import { shallow } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";
import { Icon } from "../";
import { SystemIcons } from "../../icons/dist/system-icons-enum";

expect.addSnapshotSerializer(createSerializer());

describe("Icon", () => {
  it("renders", () => {
    const component = shallow(
      <Icon
        shape={SystemIcons.ArrowDown}
        color="blue"
        size="l"
        ariaLabel="test icon"
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with defaults", () => {
    const component = shallow(<Icon shape={SystemIcons.ArrowDown} />);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders display block", () => {
    const component = shallow(<Icon shape={SystemIcons.ArrowDown} block />);

    expect(toJson(component)).toMatchSnapshot();
  });
});
