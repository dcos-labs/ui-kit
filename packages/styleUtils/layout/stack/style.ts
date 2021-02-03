import { css } from "@emotion/css";
import {
  boxSpacing,
  SpaceSize
} from "../../../shared/styles/styleUtils/modifiers/modifierUtils";

export const stack = (spaceSize?: SpaceSize) => css`
  > * {
    margin-bottom: 0;
  }
  > * + * {
    ${boxSpacing("margin", "top", spaceSize)};
  }
`;
