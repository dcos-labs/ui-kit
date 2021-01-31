import { css } from "@emotion/css";
import {
  fontSizeS,
  themeBgPrimaryInverted
} from "../design-tokens/build/js/designTokens";
import { Direction } from "../dropdownable/components/Dropdownable";
import { getContainerCaret } from "../shared/styles/containerWithCaret";

export const tooltip = css`
  background-color: ${themeBgPrimaryInverted};
  border-radius: 2px;
  box-sizing: border-box;
  font-size: ${fontSizeS};
`;

export const getTooltipArrow = (direction: Direction) => css`
  ${getContainerCaret(direction, themeBgPrimaryInverted)};
`;
