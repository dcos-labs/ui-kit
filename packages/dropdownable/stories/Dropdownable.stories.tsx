import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { withInfo } from "@storybook/addon-info";
import { selectV2 } from "@storybook/addon-knobs";

const readme = require("../README.md");

import Dropdownable, { Direction } from "../components/Dropdownable";
import DropdownStory from "./helpers/DropdownStory";
import DropdownStoryFit from "./helpers/DropdownStoryFit";

storiesOf("Dropdownable", module)
  .addDecorator(withReadme([readme]))
  .add(
    "with custom direction",
    withInfo({
      propTables: [Dropdownable]
    })(() => {
      const options = {
        BottomLeft: "bottom-left",
        BottomRight: "bottom-right",
        TopLeft: "top-left",
        TopRight: "top-right"
      };

      const knobDirection = selectV2("Direction", options, "BottomLeft");

      function getKeyByValue(value): string {
        return (
          Object.keys(options).find(key => options[key] === value) ||
          "BottomLeft"
        );
      }

      return (
        <DropdownStory
          preferredDirections={[Direction[getKeyByValue(knobDirection)]]}
        >
          Change dropdown orientation using knobs
        </DropdownStory>
      );
    })
  )
  .add(
    "with multiple direction preferences",
    withInfo({
      propTables: [Dropdownable]
    })(() => {
      return (
        <DropdownStoryFit>
          Open the dropdown before and after expanding the height
        </DropdownStoryFit>
      );
    })
  );
