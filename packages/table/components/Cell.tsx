import styled from "@emotion/styled";
import { css } from "emotion";
import { innerCellCss, cellAlignmentCss } from "../style";

export type TextAlign = "left" | "right" | "center";
export interface CellProps {
  textAlign?: TextAlign;
  children: React.ReactElement<HTMLElement> | string;
  className?: string;
}

const alignmentStyle = (props: CellProps) => css`
  ${cellAlignmentCss(props.textAlign || "left")};
`;

export default styled("div")`
  ${innerCellCss};
  ${alignmentStyle};
`;
