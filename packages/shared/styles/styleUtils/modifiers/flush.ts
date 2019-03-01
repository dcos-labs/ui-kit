import { css } from "emotion";
import { boxSpacing, BoxSides } from "./modifierUtils";

export const flush = (side: BoxSides) => {
  return css`
    ${boxSpacing("padding", side, "none")};
    ${boxSpacing("margin", side, "none")};
  `;
};
