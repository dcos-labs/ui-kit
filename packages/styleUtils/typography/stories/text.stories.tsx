import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { withKnobs, select } from "@storybook/addon-knobs";
import {
  themeTextColorDisabled,
  themeTextColorPrimary,
  themeTextColorSecondary,
  blue
} from "../../../design-tokens/build/js/designTokens";
import { FontSizes } from "../../../shared/styles/styleUtils/typography/textSize";

import { Text } from "../";

import readme from "../README.md";
type WrapVals = "truncate" | "nowrap" | "wrap";

storiesOf("Typography|Text", module)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .addDecorator(withKnobs)
  .add("default", () => (
    <Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Text>
  ))
  .add("align", () => {
    const textAlignments = {
      left: "left",
      right: "right",
      center: "center"
    };
    const align = select("align", textAlignments, "center");

    return (
      <Text align={align as React.CSSProperties["textAlign"]}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
    );
  })
  .add("wrap", () => {
    const wrapVals = {
      wrap: "wrap",
      nowrap: "nowrap",
      truncate: "truncate"
    };
    const wrap = select("wrap", wrapVals, "wrap");

    return (
      <div>
        <p>Use the Knobs panel to change how text wraps</p>
        <div style={{ width: "300px" }}>
          <Text wrap={wrap as WrapVals}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </div>
      </div>
    );
  })
  .add("size", () => {
    const sizes = {
      s: "s",
      m: "m",
      l: "l",
      xl: "xl"
    };
    const size = select("size", sizes, "m");

    return (
      <Text size={size as FontSizes}>
        Use the Knobs panel to change the font size
      </Text>
    );
  })
  .add("responsive size", () => {
    return (
      <Text
        size={{
          default: "s",
          medium: "m",
          large: "l",
          jumbo: "xl"
        }}
      >
        Change the width of your viewport to see the font size change
      </Text>
    );
  })
  .add("color", () => {
    const colors = {
      themeTextColorPrimary,
      themeTextColorSecondary,
      themeTextColorDisabled,
      blue
    };
    const color = select("color", colors, themeTextColorPrimary);

    return (
      <Text color={color}>Use the Knobs panel to change the text color</Text>
    );
  })
  .add("medium weight", () => (
    <Text weight="medium">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </Text>
  ))
  .add("custom HTML tag", () => (
    <Text tag="span">{`This text is in a <span> tag`}</Text>
  ))
  .add("nested HTML tag", () => (
    <Text>
      <span>{`This text is in a <span> tag passed as a child`}</span>
    </Text>
  ));
