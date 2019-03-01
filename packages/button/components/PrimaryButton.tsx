import * as React from "react";
import { jsx } from "@emotion/core";
import {
  default as ButtonBase,
  ButtonProps,
  ButtonAppearances
} from "./ButtonBase";

const PrimaryButton = (props: ButtonProps) => (
  <ButtonBase appearance={ButtonAppearances.Primary} {...props} />
);

export default PrimaryButton;
