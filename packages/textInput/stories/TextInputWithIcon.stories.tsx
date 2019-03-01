import { css, cx } from "emotion";
import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { TextInputWithIcon } from "../index";
import { CloseIcon, DownTriangle } from "../../shared/icons";
import { InputAppearance } from "../../shared/types/inputAppearance";

const readme = require("../README.md");

const defaultDisplayItem = css`
  width: 360px;
`;

storiesOf("Forms/TextInputWithIcon", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("iconStart", () => (
    <div>
      <TextInputWithIcon
        id="standard.input"
        className={cx(defaultDisplayItem)}
        iconStart={<DownTriangle />}
        inputLabel="Single icon - Standard"
      />
      <br />
      <TextInputWithIcon
        id="error.input"
        className={cx(defaultDisplayItem)}
        iconStart={<DownTriangle />}
        inputLabel="Single icon - Error"
        appearance={InputAppearance.Error}
      />
      <br />
      <TextInputWithIcon
        id="success.input"
        className={cx(defaultDisplayItem)}
        iconStart={<DownTriangle />}
        inputLabel="Single icon - Success"
        appearance={InputAppearance.Success}
      />
      <br />
      <TextInputWithIcon
        id="disabled.input"
        className={cx(defaultDisplayItem)}
        iconStart={<DownTriangle />}
        inputLabel="Single icon - Disabled"
        disabled={true}
        placeholder="Placeholder"
      />
      <br />
      <TextInputWithIcon
        id="disabled.value.input"
        className={cx(defaultDisplayItem)}
        iconStart={<DownTriangle />}
        inputLabel="Single icon - Disabled w/ Value"
        disabled={true}
        value="Text Value"
      />
    </div>
  ))
  .addWithInfo("iconEnd", () => (
    <TextInputWithIcon
      id="story.input"
      className={cx(defaultDisplayItem)}
      iconEnd={<CloseIcon />}
      inputLabel={<span>Ending Icon</span>}
    />
  ))
  .addWithInfo("iconStart & End", () => (
    <TextInputWithIcon
      id="story.input"
      className={cx(defaultDisplayItem)}
      iconStart={<DownTriangle />}
      iconEnd={<CloseIcon />}
      inputLabel="Two Icons"
    />
  ))
  .addWithInfo("hidden label", () => (
    <TextInputWithIcon
      id="story.input"
      className={cx(defaultDisplayItem)}
      iconEnd={<CloseIcon />}
      inputLabel="I'm not displayed"
      showInputLabel={false}
    />
  ))
  .addWithInfo("hint text", () => (
    <div>
      <TextInputWithIcon
        id="story.input"
        className={cx(defaultDisplayItem)}
        iconEnd={<CloseIcon />}
        inputLabel="Some field"
        hintContent="I should have the right data."
      />
      <br />
      <TextInputWithIcon
        id="story.input"
        className={cx(defaultDisplayItem)}
        iconEnd={<CloseIcon />}
        inputLabel="Some field"
        hintContent="I should have the right data."
        appearance={InputAppearance.Error}
        errors={["I'm an error message!"]}
      />
    </div>
  ));
