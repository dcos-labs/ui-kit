import * as React from "react";
import { jsx } from "@emotion/core";
import { default as InfoBox, InfoBoxProps } from "./InfoBox";
import { infoBoxBanner } from "../style";

const InfoBoxBanner = (props: InfoBoxProps) => (
  <InfoBox className={infoBoxBanner} {...props} />
);

export default InfoBoxBanner;
