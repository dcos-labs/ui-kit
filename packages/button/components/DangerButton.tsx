import * as React from "react";
import { jsx } from "@emotion/core";
import {
  default as ButtonBase,
  ButtonProps,
  ButtonAppearances
} from "./ButtonBase";

const DangerButton = (props: ButtonProps) => (
  <ButtonBase appearance={ButtonAppearances.Danger} {...props} />
);

export default DangerButton;
