import React from "react";
import { mount } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";
import { RadioInput } from "./";
import { InputAppearance } from "../shared/types/inputAppearance";

expect.addSnapshotSerializer(createSerializer());

describe("RadioInput", () => {
  it("renders all appearances", () => {
    Object.keys(InputAppearance).forEach(appearance => {
      const component = mount(
        <RadioInput
          id="defaultId"
          inputLabel="Sample label"
          value="default"
          appearance={InputAppearance[appearance]}
          name="appearanceTest"
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
