import React from "react";
import { shallow } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";

expect.addSnapshotSerializer(createSerializer());

import { ProgressBar } from "../";
import { ProgressBarSizes } from "../components/ProgressBar";

describe("ProgressBar", () => {
  it("renders with one segment of data", () => {
    const component = shallow(<ProgressBar data={[{ percentage: 40 }]} />);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with multiple segments of data", () => {
    const component = shallow(
      <ProgressBar
        data={[
          { color: "green", percentage: 40 },
          { color: "yellow", percentage: 20 }
        ]}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders all sizes", () => {
    Object.keys(ProgressBarSizes).forEach(size => {
      const component = shallow(
        <ProgressBar
          size={ProgressBarSizes[size]}
          isProcessing={true}
          data={[{ percentage: 40 }]}
        />
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });
  it("renders isProcessing", () => {
    const component = shallow(
      <ProgressBar isProcessing={true} data={[{ percentage: 40 }]} />
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with caption text and value text", () => {
    const component = shallow(
      <ProgressBar caption="Caption" value="40%" data={[{ percentage: 40 }]} />
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
