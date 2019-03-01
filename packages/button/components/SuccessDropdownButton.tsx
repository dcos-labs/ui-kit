import * as React from "react";
import { jsx } from "@emotion/core";
import SuccessButton from "./SuccessButton";
import { ButtonProps } from "./ButtonBase";
import { DownTriangle } from "../../shared/icons";

const SuccessDropdownButton = (props: ButtonProps) => (
  <SuccessButton iconEnd={<DownTriangle />} {...props} />
);

export default SuccessDropdownButton;
