import * as React from "react";
import { css } from "@emotion/css";
import {
  themeTextColorSecondary,
  fontSizeS
} from "../../../../design-tokens/build/js/designTokens";

const outline = css`
  background-color: #f5f5f5;
  outline: 1px solid rgba(0, 0, 0, 0.1);
`;
const textStyle = css`
  color: ${themeTextColorSecondary};
  font-size: ${fontSizeS};
`;

export const outlineDecorator = storyFn => (
  <div>
    <p className={textStyle}>
      The outline and background color are for demo purposes only
    </p>
    <div className={outline}>{storyFn()}</div>
  </div>
);
