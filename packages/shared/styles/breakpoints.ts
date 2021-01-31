import { css } from "@emotion/css";
import {
  breakpointSmall,
  breakpointMedium,
  breakpointLarge,
  breakpointJumbo
} from "../../design-tokens/build/js/designTokens";

export const breakpoints = {
  default: 0,
  small: breakpointSmall,
  medium: breakpointMedium,
  large: breakpointLarge,
  jumbo: breakpointJumbo
};

export interface BreakpointsFor<A> {
  default?: A;
  small?: A;
  medium?: A;
  large?: A;
  jumbo?: A;
}

export type BreakpointConfig<A> = A | BreakpointsFor<A>;

export const atMediaUp = Object.keys(breakpoints).reduce(
  (acc: any, curr: any) => {
    acc[curr] = cls => {
      return css`
        @media (min-width: ${breakpoints[curr]}) {
          ${cls};
        }
      `;
    };
    return acc;
  },
  {}
);
