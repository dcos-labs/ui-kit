import { css, keyframes } from "@emotion/css";
import { padding } from "../shared/styles/styleUtils";
import { iconSizeXl, greyLight } from "../design-tokens/build/js/designTokens";

export const sectionLoadingWrapper = css`
  ${padding("all", "l")};
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const sectionLoadingKeyframes = keyframes`
    0% {
        opacity: 1;
        transform: scale(0);
    }
    100% {
        opacity: 0;
        transform:scale(1);
    }
`;

// The SectionLoadingIndicator is intentionally not visible for 1 second.
// Instead of using React to delay rendering, this style visually hides the component.
const delayVisibility = css`
  animation-delay: 1s;
  opacity: 0;
`;

export const sectionLoadingIndicator = css`
  ${delayVisibility};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: ${sectionLoadingKeyframes};
  animation-timing-function: ease-in-out;
  background-color: ${greyLight};
  border-radius: 100%;
  display: inline-block;
  height: ${iconSizeXl};
  width: ${iconSizeXl};
`;
