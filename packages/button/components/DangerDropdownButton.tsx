import * as React from "react";
import { jsx } from "@emotion/core";
import DangerButton from "./DangerButton";
import { ButtonProps } from "./ButtonBase";
import { DownTriangle } from "../../shared/icons";

const DangerDropdownButton = (props: ButtonProps) => (
  <DangerButton iconEnd={<DownTriangle />} {...props} />
);

export default DangerDropdownButton;
