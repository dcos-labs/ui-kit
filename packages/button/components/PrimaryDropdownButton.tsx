import * as React from "react";
import { jsx } from "@emotion/core";
import PrimaryButton from "./PrimaryButton";
import { ButtonProps } from "./ButtonBase";
import { DownTriangle } from "../../shared/icons";

const PrimaryDropdownButton = (props: ButtonProps) => (
  <PrimaryButton iconEnd={<DownTriangle />} {...props} />
);

export default PrimaryDropdownButton;
