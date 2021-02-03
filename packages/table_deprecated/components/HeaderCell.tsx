import React from "react";
import { cx } from "@emotion/css";
import { useId } from "react-id-generator";

import Cell, { CellProps } from "./Cell";
import { headerCellCss, headerCellInner } from "../style";
import {
  textTruncate,
  display,
  flexItem,
  padding
} from "../../shared/styles/styleUtils";
import { Icon } from "../../icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import { greyLightDarken2 } from "../../design-tokens/build/js/designTokens";
import { Tooltip } from "../../tooltip";

export interface HeaderCellProps extends CellProps {
  tooltipContent?: React.ReactNode;
  tooltipId?: string;
}

const HeaderCell = ({
  capitalize = true,
  children,
  tooltipContent,
  tooltipId = useId(1, "columnHeaderTooltip-")[0],
  className,
  ...other
}: HeaderCellProps) => (
  <Cell
    capitalize={capitalize}
    className={cx(className, headerCellCss)}
    {...other}
  >
    <div className={cx(display("inline-flex"), headerCellInner)}>
      <div
        className={cx(textTruncate, flexItem("grow"), padding("right", "xxs"))}
      >
        {children}
      </div>
      {tooltipContent ? (
        <Tooltip
          id={tooltipId}
          trigger={
            <Icon
              shape={SystemIcons.CircleQuestion}
              size="xs"
              color={greyLightDarken2}
            />
          }
        >
          {tooltipContent}
        </Tooltip>
      ) : null}
    </div>
  </Cell>
);

export default HeaderCell;
