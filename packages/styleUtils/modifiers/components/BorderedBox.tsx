import * as React from "react";
import { cx } from "@emotion/css";
import Box, { BoxProps } from "./Box";
import { BoxSides } from "../../../shared/styles/styleUtils/modifiers/modifierUtils";
import {
  BorderRadii,
  BorderVariant,
  border,
  borderRadius
} from "../../../shared/styles/styleUtils/modifiers/border";

interface BorderedBoxProps extends BoxProps {
  /**
   * Which side (or sides) the border should be on
   */
  side: BoxSides;
  /**
   * Sets a `border-radius`
   */
  radius?: BorderRadii;
  /**
   * Which style of border to use
   */
  variant?: BorderVariant;
}

const BorderedBox = (props: BorderedBoxProps) => {
  const { side, radius, variant, className, ...other } = props;

  return (
    <Box
      className={cx(className, border(side, variant), borderRadius(radius))}
      data-cy="borderedBox"
      {...other}
    />
  );
};

BorderedBox.defaultProps = {
  radius: "none",
  tag: "div"
};

export default BorderedBox;
