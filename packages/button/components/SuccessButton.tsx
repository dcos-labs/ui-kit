import * as React from "react";
import { jsx } from "@emotion/core";
import {
  default as ButtonBase,
  ButtonProps,
  ButtonAppearances
} from "./ButtonBase";

const SuccessButton = (props: ButtonProps) => (
  <ButtonBase appearance={ButtonAppearances.Success} {...props} />
);

export default SuccessButton;
