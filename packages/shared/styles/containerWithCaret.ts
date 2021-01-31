import { css } from "@emotion/css";
import {
  spaceS,
  spaceXxs,
  themeBgPrimary
} from "../../design-tokens/build/js/designTokens";
import { Direction } from "../../dropdownable/components/Dropdownable";

const triangleSize = 5;
const spaceFromTrigger = parseInt(spaceXxs, 10);
const containerBoundarySpacing = triangleSize + spaceFromTrigger;

const isTopAligned = (direction: Direction) =>
  [Direction.TopLeft, Direction.TopRight, Direction.TopCenter].includes(
    direction
  );

const alignCaretStyles = (
  vert: "top" | "bottom",
  horiz: "left" | "right" | "center"
) => {
  const vertStyles = `
    ${vert === "top" ? "bottom" : "top"}: ${spaceFromTrigger}px;
  `;
  const horizStyles =
    horiz !== "center"
      ? `
          ${horiz}: ${spaceS};
        `
      : `
          left: calc(50% - ${triangleSize}px);
        `;

  return `
      position: absolute;
      ${vertStyles}
      ${horizStyles}
    `;
};

const getCaretBorderSides = (direction: Direction) =>
  isTopAligned(direction) ? ["right", "bottom"] : ["left", "top"];

export const alignContainerWithCaretStyles = (direction: Direction) => css`
  transform: translateY(
    ${isTopAligned(direction)
      ? containerBoundarySpacing * -1
      : containerBoundarySpacing}px
  );
`;

export const getContainerCaret = (
  direction: Direction,
  bgColor?: string,
  borderColor?: string
) => {
  let caretAlignmentStyles = alignCaretStyles("top", "center");
  switch (direction) {
    case Direction.BottomLeft:
      caretAlignmentStyles = alignCaretStyles("bottom", "left");
      break;
    case Direction.BottomRight:
      caretAlignmentStyles = alignCaretStyles("bottom", "right");
      break;
    case Direction.BottomCenter:
      caretAlignmentStyles = alignCaretStyles("bottom", "center");
      break;
    case Direction.TopLeft:
      caretAlignmentStyles = alignCaretStyles("top", "left");
      break;
    case Direction.TopRight:
      caretAlignmentStyles = alignCaretStyles("top", "right");
      break;
    case Direction.TopCenter:
      caretAlignmentStyles = alignCaretStyles("top", "center");
      break;
    default:
      break;
  }

  return css`
    ${caretAlignmentStyles};
    ${borderColor &&
      getCaretBorderSides(direction).map(
        side => `border-${side}: 1px solid ${borderColor};`
      )};
    background-color: ${bgColor || themeBgPrimary};
    box-sizing: border-box;
    transform: rotate(45deg);
    height: ${triangleSize * 2}px;
    width: ${triangleSize * 2}px;
  `;
};
