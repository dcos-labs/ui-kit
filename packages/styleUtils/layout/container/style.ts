import { css } from "@emotion/css";
import {
  containerWidthDefault,
  containerWidthAtMedium,
  containerWidthAtLarge,
  containerWidthAtJumbo
} from "../../../design-tokens/build/js/designTokens";
import { atMediaUp } from "../../../shared/styles/breakpoints";

export const container = css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${containerWidthDefault};
  width: 100%;

  ${atMediaUp.medium(css`
    max-width: ${containerWidthAtMedium};
  `)};

  ${atMediaUp.large(css`
    max-width: ${containerWidthAtLarge};
  `)};

  ${atMediaUp.jumbo(css`
    max-width: ${containerWidthAtJumbo};
  `)};
`;
