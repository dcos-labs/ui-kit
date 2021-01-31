import * as React from "react";
import { css } from "@emotion/css";
import { themeBgSecondary } from "../design-tokens/build/js/designTokens";

export const avatarContainer = css`
  background-color: ${themeBgSecondary};
  border-radius: 25%;
  overflow: hidden;
  position: relative;

  &:after {
    border-radius: inherit;
    bottom: 0;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
    content: "";
    display: block;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const avatarSize = (
  size: React.CSSProperties["width"] | React.CSSProperties["height"]
) => css`
  height: ${size};
  width: ${size};
`;

export const avatarImg = css`
  border: 0;
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
