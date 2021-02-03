import React from "react";
import { createSerializer } from "@emotion/jest";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import { ClickToCopyButton } from "../";

expect.addSnapshotSerializer(createSerializer());

const textToCopy = "text to copy";

jest.mock("copy-to-clipboard", () => jest.fn());

describe("ClickToCopyButton", () => {
  it("renders default", () => {
    const component = mount(<ClickToCopyButton textToCopy={textToCopy} />);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with custom children", () => {
    const component = mount(
      <ClickToCopyButton textToCopy={textToCopy}>
        custom children
      </ClickToCopyButton>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("calls onCopy when clicked ", () => {
    const onCopyFn = jest.fn();
    const component = mount(
      <ClickToCopyButton
        textToCopy={textToCopy}
        onCopy={onCopyFn}
        tooltipId="copyTooltip"
      />
    );

    expect(onCopyFn).not.toHaveBeenCalled();
    component
      .find('[role="button"]')
      .first()
      .simulate("click");
    expect(onCopyFn).toHaveBeenCalled();
  });
});
