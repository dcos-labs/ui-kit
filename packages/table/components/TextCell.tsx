import { default as Cell } from "./Cell";
import styled from "@emotion/styled";
import { textTruncate } from "../../shared/styles/styleUtils";

export default styled(Cell)`
  ${textTruncate};
`;
