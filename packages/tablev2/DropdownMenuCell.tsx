import * as React from "react";
import DropdownMenu, {
  DropdownMenuProps
} from "../dropdownMenu/components/DropdownMenu";
import { ResetButton } from "../button";
import { Icon } from "../icon";
import { SystemIcons } from "../icons/dist/system-icons-enum";
import { css } from "@emotion/css";

const style = css`
  display: flex;
  justify-content: flex-end;
`;

const trigger = (
  <ResetButton>
    <Icon shape={SystemIcons.EllipsisVertical} size="xs" />
  </ResetButton>
);

export const DropdownMenuCell: React.StatelessComponent<Omit<
  DropdownMenuProps,
  "trigger"
>> = props => (
  <div className={style}>
    <DropdownMenu trigger={trigger} {...props} />
  </div>
);
