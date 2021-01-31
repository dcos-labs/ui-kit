import * as React from "react";
import { default as Cell, CellProps } from "./Cell";
import { textTruncate } from "../../shared/styles/styleUtils";
import { cx } from "@emotion/css";

const TextCell = ({ className, ...other }: CellProps) => (
  <Cell className={cx(className, textTruncate)} {...other} />
);

export default TextCell;
