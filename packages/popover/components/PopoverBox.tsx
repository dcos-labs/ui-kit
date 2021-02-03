import * as React from "react";
import { cx } from "@emotion/css";
import { menuList, hideHoriztonalScroll, getPopoverBoxArrow } from "../style";
import { alignContainerWithCaretStyles } from "../../shared/styles/containerWithCaret";
import { border } from "../../shared/styles/styleUtils";
import { Direction } from "../../dropdownable/components/Dropdownable";

export interface PopoverProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  direction?: Direction;
  maxHeight?: number;
  maxWidth?: number;
  menuRef?: React.RefObject<HTMLDivElement>;
  showPointerCaret?: boolean;
  width?: number;
}

const Popover = (props: PopoverProps) => {
  const {
    direction = Direction.TopCenter,
    maxHeight,
    maxWidth,
    menuRef,
    showPointerCaret,
    width,
    ...other
  } = props;
  return (
    <>
      <div
        className={cx(menuList, border("all"), {
          [alignContainerWithCaretStyles(direction)]: showPointerCaret,
          [hideHoriztonalScroll]:
            !width && !maxWidth && !other.style?.maxWidth && !other.style?.width
        })}
        ref={menuRef}
        style={{ width, maxHeight, maxWidth }}
        data-cy="popover"
        {...other}
      />
      {showPointerCaret && <div className={getPopoverBoxArrow(direction)} />}
    </>
  );
};

export default Popover;
