import { css } from "@emotion/css";
import { SpaceSize } from "../shared/styles/styleUtils/modifiers/modifierUtils";
import { border, padding } from "../shared/styles/styleUtils";

export const inlineBorderedItems = (gutterSize: SpaceSize) => css`
  > * {
    ${padding("right", gutterSize)};
    display: inline-block;
  }

  > * + * {
    ${border("left")};
    ${padding("left", gutterSize)};

    &:last-child {
      padding-right: unset;
    }
  }
`;
