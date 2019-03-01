import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import ToggleInputListStoryHelper from "./helpers/ToggleInputListStoryHelper";
import { InputAppearance } from "../../shared/types/inputAppearance";

const readme = require("../README.md");
const options = [
  { inputLabel: "Exosphere", id: "id.1", value: "exosphere" },
  { inputLabel: "Thermosphere", id: "id.2", value: "thermosphere" },
  { inputLabel: "Stratosphere", id: "id.3", value: "stratosphere" }
];

storiesOf("Forms/ToggleInputList", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("checkbox", () => (
    <ToggleInputListStoryHelper
      id="checkbox"
      items={options}
      listLabel="Atmosphere layers"
    />
  ))
  .addWithInfo("checkbox selected", () => (
    <ToggleInputListStoryHelper
      id="checkboxSelected"
      items={options}
      listLabel="Atmosphere layers"
      selectedItems={["stratosphere"]}
    />
  ))
  .addWithInfo("checkbox w/ errors", () => (
    <ToggleInputListStoryHelper
      id="withErrors"
      items={[
        { inputLabel: "Exosphere", id: "id.1", value: "exosphere" },
        {
          inputLabel: "Thermosphere",
          id: "id.2",
          value: "thermosphere",
          appearance: InputAppearance.Error
        },
        { inputLabel: "Stratosphere", id: "id.3", value: "stratosphere" }
      ]}
      listLabel="Atmosphere layers"
      errors={["Something is wrong here"]}
    />
  ))
  .addWithInfo("checkbox w/ hint content", () => (
    <ToggleInputListStoryHelper
      id="withHint"
      items={options}
      listLabel="Atmosphere layers"
      hintContent="I'm a helpful hint"
    />
  ))
  .addWithInfo("checkbox w/ hidden label", () => (
    <ToggleInputListStoryHelper
      id="hiddenLabel"
      items={options}
      listLabel="You can't see me"
      showListLabel={false}
    />
  ));
