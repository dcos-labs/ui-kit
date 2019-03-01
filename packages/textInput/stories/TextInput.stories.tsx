import { css, cx } from "emotion";
import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { TextInput } from "../index";
import { InputAppearance } from "../../shared/types/inputAppearance";
const readme = require("../README.md");

const defaultDisplayItem = css`
  width: 160px;
`;

storiesOf("Forms/TextInput", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("default", () => (
    <div>
      <TextInput
        id="standard.input"
        className={cx(defaultDisplayItem)}
        inputLabel="Standard"
        placeholder="Placeholder"
      />
      <br />
      <TextInput
        id="error.input"
        className={cx(defaultDisplayItem)}
        inputLabel="Error"
        appearance={InputAppearance.Error}
        placeholder="Placeholder"
      />
      <br />
      <TextInput
        id="success.input"
        className={cx(defaultDisplayItem)}
        inputLabel="Success"
        appearance={InputAppearance.Success}
        placeholder="Placeholder"
      />
      <br />
      <TextInput
        id="disabled.input"
        className={cx(defaultDisplayItem)}
        inputLabel="Disabled"
        disabled={true}
        placeholder="Placeholder"
      />
      <br />
      <TextInput
        id="disabled.value.input"
        className={cx(defaultDisplayItem)}
        inputLabel="Disabled w/ Value"
        disabled={true}
        value="This is Disabled"
        placeholder="Placeholder"
      />
    </div>
  ))
  .addWithInfo("hint text", () => (
    <div>
      <TextInput
        id="hint.input"
        className={cx(
          css`
            width: 300px;
          `
        )}
        inputLabel="Require Field"
        placeholder="Placeholder"
        hintContent="Enter a correct value here. e.g. not empty"
        required={true}
      />
      <br />
      <TextInput
        id="hint.input.with.errors"
        className={cx(
          css`
            width: 300px;
          `
        )}
        inputLabel="Require Field"
        appearance={InputAppearance.Error}
        placeholder="Placeholder"
        hintContent="Enter a correct value here. e.g. not empty"
        errors={["Please enter a value.", "Another error message"]}
        required={true}
      />
    </div>
  ))
  .addWithInfo("Error with Message", () => (
    <TextInput
      id="error.input.with.message"
      className={cx(defaultDisplayItem)}
      inputLabel="Require Field"
      appearance={InputAppearance.Error}
      placeholder="Placeholder"
      errors={["Please enter a value."]}
      required={true}
    />
  ))
  .addWithInfo("Error with Messages", () => (
    <TextInput
      id="error.input.with.message"
      className={cx(defaultDisplayItem)}
      inputLabel="Require Field"
      appearance={InputAppearance.Error}
      placeholder="Placeholder"
      errors={["Please enter a value.", "Value must not be empty."]}
      required={true}
    />
  ))
  .addWithInfo("Hidden Label", () => (
    <TextInput
      id="hidden.label.input"
      className={cx(defaultDisplayItem)}
      inputLabel="Hidden"
      placeholder="hidden label"
      showInputLabel={false}
    />
  ))
  .addWithInfo("Number", () => (
    <TextInput id="number.input" type="number" inputLabel="Number" />
  ))
  .addWithInfo("Search", () => (
    <TextInput id="search.input" type="search" inputLabel="Search" />
  ))
  .addWithInfo("Email", () => (
    <TextInput id="email.input" type="email" inputLabel="Email" />
  ))
  .addWithInfo("Password", () => (
    <TextInput id="password.input" type="password" inputLabel="Password" />
  ))
  .addWithInfo("Telephone", () => (
    <TextInput id="telephone.input" type="tel" inputLabel="Telephone" />
  ))
  .addWithInfo("URL", () => (
    <TextInput id="url.input" type="url" inputLabel="URL" />
  ));
