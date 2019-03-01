import * as React from "react";
import { jsx } from "@emotion/core";
import SecondaryButton from "./SecondaryButton";
import { ButtonProps } from "./ButtonBase";
import { DownTriangle } from "../../shared/icons";

const SecondaryDropdownButton = (props: ButtonProps) => (
  <SecondaryButton iconEnd={<DownTriangle />} {...props} />
);

export default SecondaryDropdownButton;
