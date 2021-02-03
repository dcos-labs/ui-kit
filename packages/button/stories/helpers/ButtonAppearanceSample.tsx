import * as React from "react";
import { css, cx } from "@emotion/css";
import {
  inverseColorMode,
  tintContentSecondary,
  textSize,
  flush,
  padding
} from "../../../shared/styles/styleUtils";
import { greyDarkDarken3 } from "../../../design-tokens/build/js/designTokens";

const sampleWrapper = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  text-align: center;
`;

const inverseColorModeWrapper = css`
  background-color: ${greyDarkDarken3};
`;

const labelClassNames = cx(
  tintContentSecondary,
  textSize("s"),
  flush("vert"),
  padding("bottom", "xxs")
);

const ButtonAppearanceSample = ({
  children,
  isInverse
}: {
  children: React.ReactNode[];
  isInverse?: boolean;
}) => {
  return (
    <div
      className={cx(sampleWrapper, padding("vert", "s"), {
        [inverseColorModeWrapper]: isInverse,
        [inverseColorMode]: isInverse
      })}
    >
      {children.map((child, i) => {
        const label = buttonIdx => {
          switch (buttonIdx) {
            case 0:
              return "Normal";
            case 1:
              return "Disabled";
            case 2:
              return "Processing";
          }
        };
        return (
          <div key={i}>
            <p className={labelClassNames}>{label(i)}</p>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export const ButtonAppearanceSampleInverted = ({ buttonComponent }) => {
  return (
    <div
      className={cx(
        sampleWrapper,
        inverseColorModeWrapper,
        inverseColorMode,
        padding("vert", "s")
      )}
    >
      <div className="sample">
        <p className={labelClassNames}>Normal</p>
        {buttonComponent({ children: "Button", isInverse: true })}
      </div>
      <div className="sample">
        <p className={labelClassNames}>Disabled</p>
        {buttonComponent({
          children: "Button",
          disabled: true,
          isInverse: true
        })}
      </div>
      <div className="sample">
        <p className={labelClassNames}>Processing</p>
        {buttonComponent({
          children: "Button",
          isProcessing: true,
          isInverse: true
        })}
      </div>
    </div>
  );
};

export default ButtonAppearanceSample;
