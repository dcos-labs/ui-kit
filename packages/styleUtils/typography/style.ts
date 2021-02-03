import { css } from "@emotion/css";
import {
  fontLineHeightS,
  fontLineHeightM,
  fontLineHeightDefault,
  textBlockWidth
} from "../../design-tokens/build/js/designTokens";

export const textBase = css`
  line-height: ${fontLineHeightDefault};
`;

export const heading1 = css`
  line-height: ${fontLineHeightS};
`;

export const heading2 = css`
  line-height: ${fontLineHeightM};
`;

export const textBlock = css`
  hyphens: auto;

  p {
    max-width: ${textBlockWidth};
  }

  img {
    max-width: 100%;
  }

  > img {
    display: block;
    margin-right: auto;
  }

  ul,
  ol {
    padding-left: inherit;
    list-style-position: outside;
  }
`;
