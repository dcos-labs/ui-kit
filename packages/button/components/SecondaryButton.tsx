import * as React from "react";
import { jsx } from "@emotion/core";
import {
  default as ButtonBase,
  ButtonProps,
  ButtonAppearances
} from "./ButtonBase";

const SecondaryButton = (props: ButtonProps) => (
  <ButtonBase appearance={ButtonAppearances.Secondary} {...props} />
);

export default SecondaryButton;
