import * as React from "react";
import { FlexItem } from "../../styleUtils/layout";
import { css } from "@emotion/css";
import { ROW_HEIGHT } from "../../table_deprecated/components/Table";

export interface TableViewBodyProps {
  children: React.ReactNode;
  /** The height of the table's rows in pixels. Used with `minRows` to calculate the minimum row height. **Not needed unless you're using Table v1, and your table has a custom row height.** */
  rowHeight?: number;
  /** The minimum number of rows the table should show, no matter how high the viewport is. **Not needed unless you're using Table v1.** */
  minRows?: number;
}

const setMinTableHeight = (rowHeight: number, minRows: number) => css`
  min-height: ${(minRows + 1) * rowHeight}px;
  position: relative;

  > * {
    height: 100%;
  }
`;
// position: relative is needed so that div.resize-triggers (rendered by react-virtualized)
// is getting it's size from the element wrapping the table
//
// this is usually applied by react-virtualized in the `style` attribute, but there have been
// cases in Kommander where this is not happening

const TableViewBody: React.SFC<TableViewBodyProps> = ({
  children,
  rowHeight = ROW_HEIGHT,
  minRows = 5
}) => (
  <FlexItem flex="grow" className={setMinTableHeight(rowHeight, minRows)}>
    {children}
  </FlexItem>
);

export default TableViewBody;
