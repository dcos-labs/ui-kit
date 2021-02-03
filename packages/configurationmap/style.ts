import { css } from "@emotion/css";
import { rowActionStaticClassname } from "./components/ConfigurationMapRowAction";
import {
  visuallyHidden,
  undoVisuallyHidden
} from "../shared/styles/styleUtils";

export const configurationMapRow = css`
  &:last-of-type {
    border-bottom-width: 0;
  }
`;

export const configurationMapHeadingStyle = css`
  margin: 1em 0;
`;

export const configurationMapLabel = css`
  flex-basis: 15em;
  overflow: hidden;

  &,
  & > * {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
`;

export const showActionOnHoverStyle = css`
  .${rowActionStaticClassname} {
    ${visuallyHidden};
  }

  &:hover .${rowActionStaticClassname} {
    ${undoVisuallyHidden};
  }
`;
