import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import { withReadme } from "storybook-readme";
import { pickReadableTextColor } from "../../../shared/styles/color";
import {
  greyLightLighten5,
  red,
  yellow,
  green,
  blue,
  purple,
  greyLight
} from "../../../design-tokens/build/js/designTokens";
import Box from "../components/Box";
import { css } from "@emotion/css";
type VerticalAlignments = "top" | "bottom" | "center";

import readme from "../README.md";

storiesOf("Style utilities|Box", module)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .addDecorator(withKnobs)
  .add("bgColor", () => {
    const colors = {
      greyLightLighten5,
      red,
      yellow,
      green,
      blue,
      purple
    };
    const color = select("bgColor", colors, greyLightLighten5);
    const textColor = pickReadableTextColor(color, "#000000", "#FFFFFF");

    return (
      <Box bgColor={color}>
        <span style={{ color: textColor }}>
          Use the Knobs panel to change the background color
        </span>
      </Box>
    );
  })
  .add("bgImg", () => (
    <Box bgImageUrl="https://via.placeholder.com/150">
      <div style={{ height: "300px" }} />
    </Box>
  ))
  .add("bgImg w/ options", () => {
    const bgOptions = `{\n\t"position": "top-left",\n\t"repeat": "repeat-x",\n\t"size": "contain"\n}`;

    return (
      <div>
        <p>Options:</p>
        <pre>{bgOptions}</pre>
        <Box
          bgImageUrl="https://via.placeholder.com/150"
          bgImageOptions={JSON.parse(`${bgOptions}`)}
        >
          <div style={{ height: "300px" }} />
        </Box>
      </div>
    );
  })
  .add("display inline", () => (
    <React.Fragment>
      <Box display="inline">Box 1</Box>
      <Box display="inline">Box 2</Box>
      <Box display="inline">Box 3</Box>
    </React.Fragment>
  ))
  .add("vertAlignChildren", () => {
    const setHeight = css`
      > * {
        height: 200px;
      }
    `;
    const alignments = {
      top: "top",
      bottom: "bottom",
      center: "center"
    };
    const alignment = select("vertAlignChildren", alignments, "center");

    return (
      <div>
        <p>Use the Knobs panel to try other alignments</p>
        <div className={setHeight}>
          <Box
            bgColor={greyLight}
            vertAlignChildren={alignment as VerticalAlignments}
          >
            <div>Child 1</div>
            <div>Child 2</div>
            <div>Child 3</div>
          </Box>
        </div>
      </div>
    );
  })
  .add("textAlign", () => {
    const textAlignments = {
      left: "left",
      right: "right",
      center: "center"
    };
    const textAlign = select("textAlign", textAlignments, "center");

    return (
      <Box textAlign={textAlign as React.CSSProperties["textAlign"]}>
        <Box display="inline-block">Child 1</Box>
        <Box display="inline-block">Child 2</Box>
        <Box display="inline-block">Child 3</Box>
      </Box>
    );
  })
  .add("isVisuallyHidden", () => {
    return (
      <Box isVisuallyHidden={boolean("isVisuallyHidden", false)}>
        Use the "visuallyHidden" knob in the Knobs panel to hide me
      </Box>
    );
  })
  .add("custom HTML tag", () => {
    return <Box tag="section">{`This is rendered using a <section> tag`}</Box>;
  });
