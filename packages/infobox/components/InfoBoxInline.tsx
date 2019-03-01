import * as React from "react";
import { jsx } from "@emotion/core";
import { default as InfoBox, InfoBoxProps } from "./InfoBox";
import { infoBoxInline } from "../style";

const InfoBoxInline = (props: InfoBoxProps) => (
  <InfoBox className={infoBoxInline} {...props} />
);

export default InfoBoxInline;
