import { css } from "@emotion/css";
import { boxSpacing, BoxSides, SpaceSize } from "./modifierUtils";

export const padding = (side: BoxSides, spaceSize?: SpaceSize) => {
  return css`
    ${boxSpacing("padding", side, spaceSize)};
  `;
};
