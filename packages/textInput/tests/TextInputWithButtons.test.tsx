import React from "react";
import serializer from "@emotion/jest";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import TextInputWithButtons from "../components/TextInputWithButtons";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import { TextInputButton } from "../../textInputButton";

expect.addSnapshotSerializer(serializer);

describe("TextInputWithIcon", () => {
  it("renders", () => {
    const component = mount(
      <TextInputWithButtons
        id="renders"
        inputLabel="Label"
        buttons={[
          <TextInputButton key={0} shape={SystemIcons.Close} />,
          <TextInputButton key={1} shape={SystemIcons.Funnel} />
        ]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with colored button", () => {
    const component = mount(
      <TextInputWithButtons
        id="renders.coloredBtn"
        inputLabel="Label"
        buttons={[
          <TextInputButton key={0} shape={SystemIcons.Close} color="red" />
        ]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("calls function passed to button", () => {
    const buttonFn = jest.fn();
    const component = mount(
      <TextInputWithButtons
        id="callsFn"
        inputLabel="Label"
        buttons={[
          <TextInputButton
            key={0}
            shape={SystemIcons.Close}
            onClick={buttonFn}
          />
        ]}
      />
    );

    expect(buttonFn).not.toHaveBeenCalled();
    component.find("button").simulate("click");
    expect(buttonFn).toHaveBeenCalled();
  });
});
