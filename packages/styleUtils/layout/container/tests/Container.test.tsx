import React from "react";
import { shallow } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";

import Container from "../components/Container";

expect.addSnapshotSerializer(createSerializer());

describe("Container", () => {
  it("renders default", () => {
    const component = shallow(
      <Container>
        <div>content</div>
      </Container>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
