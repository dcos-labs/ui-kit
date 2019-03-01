import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { withInfo } from "@storybook/addon-info";
import { selectV2 } from "@storybook/addon-knobs";
import { Tooltip } from "../../index";
import { Direction } from "../../dropdownable/components/Dropdownable";

const readme = require("../README.md");

storiesOf("Tooltip", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("default", () => (
    <div style={{ textAlign: "center" }}>
      <Tooltip trigger="hover me" id="default">
        content
      </Tooltip>
    </div>
  ))
  .add(
    "with custom direction",
    withInfo({
      propTables: [Tooltip]
    })(() => {
      const options = {
        BottomLeft: "bottom-left",
        BottomRight: "bottom-right",
        BottomCenter: "bottom-center",
        TopLeft: "top-left",
        TopRight: "top-right",
        TopCenter: "top-center"
      };

      const knobDirection = selectV2("Direction", options, "BottomLeft");

      function getKeyByValue(value): string {
        return (
          Object.keys(options).find(key => options[key] === value) ||
          "BottomLeft"
        );
      }

      return (
        <div style={{ textAlign: "center" }}>
          <Tooltip
            trigger="hover me"
            id="customDir"
            preferredDirections={[Direction[getKeyByValue(knobDirection)]]}
          >
            Use the knobs to change tooltip alignment
          </Tooltip>
        </div>
      );
    })
  )
  .addWithInfo("min or max width", () => (
    <div>
      <div style={{ textAlign: "center", marginBottom: "1em" }}>
        <Tooltip trigger="maxWidth 100px" id="maxWidth" maxWidth={100}>
          content that is greater than 100px
        </Tooltip>
      </div>
      <div style={{ textAlign: "center" }}>
        <Tooltip
          trigger="minWidth 200px"
          id="minWidth"
          minWidth={200}
          preferredDirections={[Direction.BottomCenter]}
        >
          content
        </Tooltip>
      </div>
    </div>
  ))
  .addWithInfo("suppress toggle", () => (
    <div style={{ textAlign: "center" }}>
      <Tooltip trigger="hover me" id="suppress" open={true} suppress={true}>
        I won't toggle open and closed
      </Tooltip>
    </div>
  ));
