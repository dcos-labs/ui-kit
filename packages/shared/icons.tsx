import * as React from "react";
import { jsx } from "@emotion/core";

// TODO: once we have an icon library, use that instead
export const DownTriangle = () => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>triangle-down</title>
    <g id="triangle-down" stroke="none" strokeWidth="1" fillRule="evenodd">
      <polygon id="triangle" points="8 12 3 5 13 5" />
    </g>
  </svg>
);

export const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path
      d="M8 9.237L4.119 13.12 2.88 11.88 6.763 8 2.88 4.119 4.12 2.88 8 6.763l3.881-3.882L13.12 4.12 9.237 8l3.882 3.881-1.238 1.238L8 9.237z"
      fillRule="nonzero"
    />
  </svg>
);
