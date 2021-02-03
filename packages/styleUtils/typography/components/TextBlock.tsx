import * as React from "react";
import { cx } from "@emotion/css";
import { textBlock } from "../style";
import { Stack } from "../../layout";

const SPACE_BETWEEN_ELS = "l";

const TextBlock: React.StatelessComponent<{ className?: string }> = ({
  children,
  className
}) => {
  return (
    <Stack spacingSize={SPACE_BETWEEN_ELS} className={cx(textBlock, className)}>
      {children}
    </Stack>
  );
};

export default TextBlock;
