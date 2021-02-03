import { css } from "@emotion/css";
import { themeTextColorInteractive } from "../design-tokens/build/js/designTokens";

export const defaultLinkStyles = `
    color: ${themeTextColorInteractive};
    text-decoration: none;

    &:visited {
        color: ${themeTextColorInteractive};
    }
`;

export const defaultLink = css`
  ${defaultLinkStyles};
`;
