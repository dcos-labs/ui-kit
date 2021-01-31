import * as React from "react";
import { shallow } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";

import { AppChrome } from "../";

expect.addSnapshotSerializer(serializer);

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
