import { css } from "@emotion/css";
import { BoxSides } from "./modifierUtils";
import {
  themeBorder,
  themeBorderHeavy,
  borderRadiusDefault,
  borderRadiusSmall
} from "../../../../design-tokens/build/js/designTokens";

export type BorderVariant = "default" | "heavy";

const borderRadii = {
  none: 0,
  default: borderRadiusDefault,
  small: borderRadiusSmall
};

export type BorderRadii = keyof typeof borderRadii | undefined;

export const border = (side: BoxSides, variant: BorderVariant = "default") => {
  const borderBaseStyles = `
        border-width: 1px;
        border-color: ${variant === "heavy" ? themeBorderHeavy : themeBorder};
    `;

  const borderModifierStyles = () => {
    switch (side) {
      case "all":
        return `border-style: solid;`;
      case "horiz":
        return `
            border-left-style: solid;
            border-right-style: solid;
        `;
      case "vert":
        return `
            border-bottom-style: solid;
            border-top-style: solid;
        `;
      default:
        return `border-${side}-style: solid;`;
    }
  };

  return css`
    ${borderBaseStyles} ${borderModifierStyles()};
  `;
};

export const borderRadius = (radius: BorderRadii = "none") => css`
  border-radius: ${borderRadii[radius]};
`;
