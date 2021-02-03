import * as React from "react";
import { shallow } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";

import { AppChrome } from "../";

expect.addSnapshotSerializer(createSerializer());

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
