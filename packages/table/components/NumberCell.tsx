import * as React from "react";
import { jsx } from "@emotion/core";
import { default as Cell, CellProps } from "./Cell";
import styled from "@emotion/styled";
import { textTruncate } from "../../shared/styles/styleUtils";

const NumberCell = (props: CellProps) => <Cell textAlign="right" {...props} />;

export default styled(NumberCell)`
  ${textTruncate};
`;
