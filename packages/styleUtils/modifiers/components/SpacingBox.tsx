import * as React from "react";
import { cx } from "@emotion/css";
import Box, { BoxProps } from "./Box";
import {
  BoxSides,
  SpaceSize
} from "../../../shared/styles/styleUtils/modifiers/modifierUtils";
import { padding } from "../../../shared/styles/styleUtils";

interface SpacingBoxProps extends BoxProps {
  /**
   * Which side (or sides) the spacing should be on
   */
  side?: BoxSides;
  /**
   * The size of the space to apply. It can set 1 spacing size for all breakpoints, or it can be used to set different spacing values at different viewport width breakpoints
   */
  spacingSize?: SpaceSize;
  /**
   * Used to set different spacing values on different sides of the element
   */
  spacingSizePerSide?: { [Side in NonNullable<BoxSides>]?: SpaceSize };
}

const SpacingBox = (props: SpacingBoxProps) => {
  const {
    side = "all",
    spacingSize,
    className,
    spacingSizePerSide,
    ...other
  } = props;
  const paddingStyles = spacingSizePerSide
    ? Object.keys(spacingSizePerSide).map(sideToSize =>
        padding(
          sideToSize as BoxSides,
          spacingSizePerSide[sideToSize] as SpaceSize
        )
      )
    : padding(side, spacingSize);

  return (
    <Box
      className={cx(className, paddingStyles)}
      data-cy="spacingBox"
      {...other}
    />
  );
};

SpacingBox.defaultProps = {
  side: "all",
  spacingSize: "m",
  tag: "div"
};

export default SpacingBox;
