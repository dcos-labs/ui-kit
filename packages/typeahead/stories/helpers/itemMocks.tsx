import * as React from "react";
import { cx } from "@emotion/css";
import {
  flex,
  flexItem,
  textWeight,
  textSize,
  padding,
  flush
} from "../../../shared/styles/styleUtils";

const ComplexItem = props => (
  <div className={flex()}>
    <div className={flexItem("shrink")}>
      <img src="http://placehold.it/24x24" alt="placeholder" />
    </div>
    <div className={cx(flexItem("grow"), padding("left"))}>
      <p className={cx(textWeight("medium"), flush("all"))}>{props.title}</p>
      <p className={cx(textSize("s"), flush("all"))}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit
        pretium felis ac accumsan.
      </p>
    </div>
  </div>
);

export const items = [
  { label: "Exosphere", value: "Exosphere" },
  { label: "Thermosphere", value: "Thermosphere" },
  { label: "Mesosphere", value: "Mesosphere" },
  { label: "Stratosphere", value: "Stratosphere" },
  { label: "Ozone Layer", value: "Ozone Layer" },
  { label: "Troposphere", value: "Troposphere" }
];

export const complexItems = items.map(item => ({
  label: <ComplexItem title={item.label} />,
  value: item.value
}));
