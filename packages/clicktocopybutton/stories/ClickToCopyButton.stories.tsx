import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { select } from "@storybook/addon-knobs";
import { ClickToCopyButton } from "../";
import { Stack } from "../../";
import {
  blue,
  green,
  purple,
  red,
  textColorPrimary,
  textColorSecondary,
  yellow,
  iconSizeXxs,
  iconSizeXs,
  iconSizeS,
  iconSizeM,
  iconSizeL,
  iconSizeXl,
  iconSizeXxl
} from "../../design-tokens/build/js/designTokens";

const readme = require("../README.md");
const textToCopy = "Nobody likes a copycat";
const colors = {
  textColorPrimary,
  textColorSecondary,
  red,
  yellow,
  green,
  blue,
  purple
};
const sizes = {
  iconSizeXxs,
  iconSizeXs,
  iconSizeS,
  iconSizeM,
  iconSizeL,
  iconSizeXl,
  iconSizeXxl
};

storiesOf("Actions|ClickToCopyButton", module)
  .addDecorator(withReadme([readme]))
  .add("default", () => (
    <ClickToCopyButton textToCopy={textToCopy} tooltipId="copyTooltip" />
  ))
  .add("w/ onCopy callback", () => {
    const onCopyFn = () => {
      alert("oncopy");
    };
    return <ClickToCopyButton textToCopy={textToCopy} onCopy={onCopyFn} />;
  })
  .add("w/ custom color", () => {
    const color = select("Color", colors, blue);
    return (
      <Stack>
        <div>
          <ClickToCopyButton textToCopy={textToCopy} color={color} />
        </div>
        <div>
          <ClickToCopyButton textToCopy={textToCopy} color={color}>
            <div>{`Click here to copy the text: "${textToCopy}"`}</div>
          </ClickToCopyButton>
        </div>
        <p>Use the knobs panel to change the text and icon colors</p>
      </Stack>
    );
  })
  .add("w/ custom icon size", () => {
    const size = select("Size", sizes, iconSizeXs);
    return (
      <Stack>
        <div>
          <ClickToCopyButton textToCopy={textToCopy} iconSize={size} />
        </div>
        <p>Use the knobs panel to change the icon size</p>
      </Stack>
    );
  })
  .add("show custom tooltip content on copy", () => (
    <ClickToCopyButton
      textToCopy={textToCopy}
      tooltipContent={`"${textToCopy}" copied`}
    />
  ))
  .add("w/ custom children", () => (
    <ClickToCopyButton textToCopy={textToCopy}>
      <div>{`Click here to copy the text: "${textToCopy}"`}</div>
    </ClickToCopyButton>
  ));
