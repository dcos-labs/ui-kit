import * as React from "react";
import { jsx } from "@emotion/core";
import { Clickable } from "../../../clickable";
import { action } from "@storybook/addon-actions";

import { purple } from "../../../design-tokens/build/js/designTokens";

const fakeButtonStyles = {
  cursor: "pointer",
  color: purple
};

export const PrimaryAction = () => (
  <Clickable action={action("primaryAction triggered")} tabIndex="0">
    <span style={fakeButtonStyles}>Primary Action</span>
  </Clickable>
);

export const SecondaryAction = () => (
  <Clickable action={action("secondaryAction triggered")} tabIndex="0">
    <span style={fakeButtonStyles}>Secondary Action</span>
  </Clickable>
);
