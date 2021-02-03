import React from "react";
import { mount } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";
import { CheckboxInput } from "../";
import { InputAppearance } from "../../shared/types/inputAppearance";

expect.addSnapshotSerializer(createSerializer());

describe("CheckboxInput", () => {
  it("renders all appearances", () => {
    Object.keys(InputAppearance).forEach(appearance => {
      const component = mount(
        <CheckboxInput
          id="defaultId"
          inputLabel="Sample label"
          value="default"
          appearance={InputAppearance[appearance]}
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  it("renders with a hidden label", () => {
    const component = mount(
      <CheckboxInput
        id="hiddenLabel"
        inputLabel="Sample Label"
        value="default"
        showInputLabel={false}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders indeterminate", () => {
    const component = mount(
      <CheckboxInput
        id="indeterminateId"
        inputLabel="Sample Label"
        value="indeterminate"
        indeterminate={true}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
