import * as React from "react";
import { jsx } from "@emotion/core";
import { shallow } from "enzyme";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
import toJson from "enzyme-to-json";

import { AppChrome } from "../";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("AppChrome", () => {
  it("renders with the app chrome regions", () => {
    const component = shallow(
      <AppChrome
        sidebar={<div>Sidebar content</div>}
        headerBar={<div>HeaderBar content goes here</div>}
        mainContent={<div>Main app content goes here</div>}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
