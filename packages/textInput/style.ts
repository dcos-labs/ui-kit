import { css } from "@emotion/css";
import { spaceXs } from "../design-tokens/build/js/designTokens";
import { textInputHeight } from "../shared/styles/formStyles";

const badgeGapSize = spaceXs;

export const badgeInputContainer = css`
  height: auto;
  min-height: ${textInputHeight}px;
  padding-bottom: ${parseInt(badgeGapSize, 10) / 2}px;
  padding-top: ${parseInt(badgeGapSize, 10) / 2}px;
`;

export const badgeText = css`
  white-space: nowrap;
`;

export const badgeInputContents = css`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: ${parseInt(badgeGapSize, 10) / 2}px;
  padding-top: ${parseInt(badgeGapSize, 10) / 2}px;
  padding-right: ${badgeGapSize};

  &,
  * {
    max-width: 100%;
  }
`;

export const badgeInput = css`
  flex-grow: 1;
  min-width: 50px;
`;
