import * as React from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withReadme } from "storybook-readme";
import { SelectInput } from "../../index";
import { InputAppearance } from "../../shared/types/inputAppearance";

const readme = require("../README.md");
const defaultOptions = [
  { value: "exosphere", label: "Exosphere" },
  { value: "thermosphere", label: "Thermosphere" },
  { value: "mesosphere", label: "Mesosphere" },
  { value: "stratosphere", label: "Stratosphere" },
  { value: "troposphere", label: "Troposphere" },
  {
    value: "really-long",
    label: "A really long label just to test icon overlapping text"
  },
  { value: "disabled", label: "Can't touch this", disabled: true }
];
const InputStoryWrapper = styled("div")`
  max-width: 300px;
`;

storiesOf("Forms/SelectInput", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("default", () => (
    <InputStoryWrapper>
      <div style={{ marginBottom: "1.5em" }}>
        <SelectInput
          options={defaultOptions}
          id="layers"
          inputLabel="Atmosphere layer"
        />
      </div>
      <div style={{ marginBottom: "1.5em" }}>
        <SelectInput
          options={defaultOptions}
          appearance={InputAppearance.Error}
          id="layers"
          inputLabel="Error"
        />
      </div>
      <div style={{ marginBottom: "1.5em" }}>
        <SelectInput
          options={defaultOptions}
          appearance={InputAppearance.Success}
          id="layers"
          inputLabel="Success"
        />
      </div>
      <div style={{ marginBottom: "1.5em" }}>
        <SelectInput
          options={defaultOptions}
          id="layers"
          inputLabel="Disabled"
          disabled={true}
        />
      </div>
    </InputStoryWrapper>
  ))
  .addWithInfo("with hint", () => (
    <InputStoryWrapper>
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        hintContent="We suggest the Mesosphere"
      />
    </InputStoryWrapper>
  ))
  .addWithInfo("error with message", () => (
    <InputStoryWrapper>
      <SelectInput
        appearance={InputAppearance.Error}
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        errors={["Something is wrong here"]}
      />
    </InputStoryWrapper>
  ))
  .addWithInfo("error with messages", () => (
    <InputStoryWrapper>
      <SelectInput
        appearance={InputAppearance.Error}
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        errors={["Something is wrong here", "Another thing is wrong too"]}
      />
    </InputStoryWrapper>
  ))
  .addWithInfo("hidden label", () => (
    <InputStoryWrapper>
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        showInputLabel={false}
      />
    </InputStoryWrapper>
  ))
  .addWithInfo("with value", () => (
    <InputStoryWrapper>
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        value="thermosphere"
      />
    </InputStoryWrapper>
  ))
  .addWithInfo("with onChange", () => (
    <InputStoryWrapper>
      <SelectInput
        options={defaultOptions}
        id="layers"
        inputLabel="Atmosphere layer"
        onChange={action("onChange happened")}
        hintContent="Check the Action Logger tab on the right"
      />
    </InputStoryWrapper>
  ));
