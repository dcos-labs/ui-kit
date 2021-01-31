import React from "react";
import { shallow } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";

import SpacingBox from "../components/SpacingBox";

expect.addSnapshotSerializer(serializer);

describe("SpacingBox", () => {
  it("renders default", () => {
    const component = shallow(<SpacingBox tag="div">content</SpacingBox>);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with all props", () => {
    const component = shallow(
      <SpacingBox tag="div" side="top" spacingSize="l">
        content
      </SpacingBox>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with responsive spacingSize", () => {
    const component = shallow(
      <SpacingBox
        tag="div"
        side="top"
        spacingSize={{ default: "s", medium: "m" }}
      >
        content
      </SpacingBox>
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with different spacing on each side", () => {
    const component = shallow(
      <SpacingBox
        tag="div"
        spacingSizePerSide={{
          top: "none",
          right: "xs",
          bottom: "s",
          left: "m"
        }}
      >
        content
      </SpacingBox>
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with responsive spacing on each side", () => {
    const component = shallow(
      <SpacingBox
        tag="div"
        spacingSizePerSide={{
          top: {
            default: "none",
            medium: "xs"
          },
          right: {
            default: "none",
            medium: "s"
          },
          bottom: {
            default: "none",
            medium: "m"
          },
          left: {
            default: "none",
            medium: "l"
          }
        }}
      >
        content
      </SpacingBox>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
