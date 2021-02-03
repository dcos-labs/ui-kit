import React from "react";
import { createSerializer } from "@emotion/jest";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import { CodeSnippet } from "../";

expect.addSnapshotSerializer(createSerializer());

const snippetContent = "snippet content";

jest.mock("copy-to-clipboard", () => jest.fn());

describe("CodeSnippet", () => {
  it("renders default", () => {
    const component = mount(<CodeSnippet>{snippetContent}</CodeSnippet>);

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with copy button", () => {
    const component = mount(
      <CodeSnippet textToCopy={snippetContent}>{snippetContent}</CodeSnippet>
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("calls onCopy when copy button is clicked ", () => {
    const onCopyFn = jest.fn();
    const component = mount(
      <CodeSnippet textToCopy={snippetContent} onCopy={onCopyFn}>
        {snippetContent}
      </CodeSnippet>
    );

    expect(onCopyFn).not.toHaveBeenCalled();
    component.find('[role="button"] svg').simulate("click");
    expect(onCopyFn).toHaveBeenCalled();
  });
});
