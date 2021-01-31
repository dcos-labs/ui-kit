import * as React from "react";
import { default as Cell, CellProps } from "./Cell";
import { textTruncate } from "../../shared/styles/styleUtils";
import { cx } from "@emotion/css";

const NumberCell = ({ className, ...other }: CellProps) => (
  <Cell textAlign="right" className={cx(className, textTruncate)} {...other} />
);

export default NumberCell;
