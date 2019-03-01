import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import CheckboxStoryHelper from "./helpers/CheckboxStoryHelper";
import { css } from "emotion";
import { InputAppearance } from "../../shared/types/inputAppearance";

const readme = require("../README.md");

const checkboxGrid = css`
  display: grid;
  grid-gap: 1em;
  grid-auto-flow: column;

  > div:nth-child(n + 5) {
    grid-column: 2 / 3;
  }
`;

storiesOf("Forms/CheckboxInput", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("default", () => (
    <div className={checkboxGrid}>
      <CheckboxStoryHelper
        id="defaultId"
        inputLabel="Default"
        value="default"
      />
      <CheckboxStoryHelper
        id="errorId"
        inputLabel="Error"
        appearance={InputAppearance.Error}
        value="error"
      />
      <CheckboxStoryHelper
        id="successId"
        inputLabel="Success"
        appearance={InputAppearance.Success}
        value="success"
      />
      <CheckboxStoryHelper
        id="disabledId"
        inputLabel="Disabled"
        disabled={true}
        value="disabled"
      />
      <CheckboxStoryHelper
        id="defaultId.checked"
        inputLabel="Checked"
        checked={true}
        value="checked.default"
      />
      <CheckboxStoryHelper
        id="errorId.checked"
        inputLabel="Error checked"
        appearance={InputAppearance.Error}
        checked={true}
        value="checked.error"
      />
      <CheckboxStoryHelper
        id="successId.checked"
        inputLabel="Success checked"
        appearance={InputAppearance.Success}
        checked={true}
        value="checked.success"
      />
      <CheckboxStoryHelper
        id="disabledId.checked"
        inputLabel="Disabled checked"
        disabled={true}
        checked={true}
        value="checked.disabled"
      />
    </div>
  ))
  .addWithInfo("top-aligned text", () => (
    <CheckboxStoryHelper
      id="bigLabel"
      inputLabel={
        <div>
          <span>
            Sometimes we have a really long block of text next to an input
          </span>
          <span style={{ display: "block", fontSize: ".9em" }}>
            Here's an example of what that would look like
          </span>
          <span style={{ display: "block", fontSize: ".9em" }}>
            Here's an example of what that would look like
          </span>
          <span style={{ display: "block", fontSize: ".9em" }}>
            Here's an example of what that would look like
          </span>
          <span style={{ display: "block", fontSize: ".9em" }}>
            Here's an example of what that would look like
          </span>
        </div>
      }
      vertAlign="top"
      value="bigLabel"
    />
  ))
  .addWithInfo("indeterminate", () => (
    <CheckboxStoryHelper
      id="hiddenLabel"
      inputLabel="I'm neither true or false"
      value="indeterminate"
      indeterminate={true}
    />
  ))
  .addWithInfo("hidden label", () => (
    <CheckboxStoryHelper
      id="hiddenLabel"
      inputLabel="You can't see me"
      showInputLabel={false}
      checked={true}
      value="hiddenLabelValue"
    />
  ));
