import { css } from "@emotion/css";
import { padding, border } from "../shared/styles/styleUtils";
const standardListItemPaddingSize = "xs";

export const listMarker = listStyleType => css`
  list-style-type: ${listStyleType};
  ${listStyleType !== "none" ? padding("left") : null};
`;

export const listItem = css`
  :not(:last-child) {
    ${padding("bottom", standardListItemPaddingSize)};
  }

  > ul,
  > ol {
    ${padding("top", standardListItemPaddingSize)};
  }
`;

export const borderedListStyle = css`
  > li:not(:last-child) {
    ${padding("bottom")};
  }

  > li {
    &:not(:last-child) {
      ${border("bottom")};
    }
    &:not(:first-child) {
      ${padding("top")};
    }
  }
`;
