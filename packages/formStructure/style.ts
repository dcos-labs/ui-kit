import { css } from "@emotion/css";
import { spaceM, spaceL } from "../design-tokens/build/js/designTokens";
import { FieldListColumnSeparator } from "./components/FieldListColumn";
import { visuallyHidden } from "../shared/styles/styleUtils";

//
// FormSectionBody
//
export const formFieldStack = css`
  > * + * {
    margin-top: ${spaceL};
  }
`;

//
// FieldList
//
const GUTTER_SIZE = spaceM;

const getColumnWidth = col => {
  const { minWidth = 0, maxWidth = "1fr" } = col.props;
  const getColWidthString = width =>
    typeof width === "number" ? `${width}px` : width;

  if (!col.props.minWidth && !col.props.maxWidth) {
    return col.type === FieldListColumnSeparator ? "auto" : "1fr";
  }

  return `minmax(${getColWidthString(minWidth)}, ${getColWidthString(
    maxWidth
  )})`;
};

const generateGridColumnTemplate = (cols, removeBtnWidth) => {
  return cols
    .reduce((acc, curr) => {
      acc = [...acc, getColumnWidth(curr)];
      return acc;
    }, Array())
    .concat(removeBtnWidth)
    .join(" ");
};

export const getFieldRowGrid = (cols, removeBtnWidth) => css`
  align-items: baseline;
  display: grid;
  grid-template-columns: ${generateGridColumnTemplate(cols, removeBtnWidth)};
  grid-gap: ${GUTTER_SIZE};
`;

export const invisibleColHeader = css`
  visibility: hidden;
`;

export const fieldListStack = css`
  > * + * {
    margin-top: ${GUTTER_SIZE};
  }
`;

export const fieldWrapper = css`
  label {
    ${visuallyHidden};
  }

  input {
    width: 100%;
  }
`;
