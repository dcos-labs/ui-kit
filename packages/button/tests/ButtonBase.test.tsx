import React from "react";

import ButtonBase, { ButtonAppearances } from "../components/ButtonBase";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import serializer from "@emotion/jest";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

expect.addSnapshotSerializer(serializer);

describe("ButtonBase", () => {
  it("renders all appearances with props", () => {
    Object.keys(ButtonAppearances).forEach(appearance => {
      const component = shallow(
        <ButtonBase
          appearance={ButtonAppearances[appearance]}
          isFullWidth={true}
          type="submit"
          ariaHaspopup={true}
          disabled={true}
          isProcessing={true}
          iconStart={SystemIcons.Check}
          iconEnd={SystemIcons.Check}
        >
          Button
        </ButtonBase>
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });
  it("calls onClick prop when clicked", () => {
    const someFn = jest.fn();
    const component = mount(
      <ButtonBase appearance={ButtonAppearances.Standard} onClick={someFn}>
        Button
      </ButtonBase>
    );
    expect(someFn).not.toHaveBeenCalled();
    component.simulate("click");
    expect(someFn).toHaveBeenCalled();
  });
  it("does not call onClick prop when disabled", () => {
    const anotherFn = jest.fn();
    const component = shallow(
      <ButtonBase
        appearance={ButtonAppearances.Standard}
        disabled={true}
        onClick={anotherFn}
      >
        Button
      </ButtonBase>
    );
    expect(anotherFn).not.toHaveBeenCalled();
    component.simulate("click");
    expect(anotherFn).not.toHaveBeenCalled();
  });
});
