import { css } from "@emotion/css";
import { fontWeights } from "../../typography";

export type FontWeights = keyof typeof fontWeights;

export const textWeight = (weight: FontWeights) => css`
  font-weight: ${fontWeights[weight]};
`;
