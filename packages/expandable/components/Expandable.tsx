import * as React from "react";
import { cx } from "@emotion/css";
import Toggle from "react-toggled";
import { display } from "../../shared/styles/styleUtils";
import { toggler } from "../style";
import { ResetButton } from "../../button";
import { Icon } from "../../icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import { Flex, FlexItem } from "../../styleUtils/layout";

export interface ExpandableProps {
  children: React.ReactElement<HTMLElement> | string;
  controlledIsOpen?: boolean;
  indicatorPosition?: "left" | "right";
  isOpen?: boolean;
  label: React.ReactElement<HTMLElement> | string;
  labelClassName?: string;
  onChange?: (open: boolean) => void;
}

const Expandable: React.FC<ExpandableProps> = ({
  labelClassName,
  children,
  label,
  isOpen,
  controlledIsOpen,
  onChange,
  indicatorPosition
}) => (
  <Toggle defaultOn={Boolean(isOpen)} on={controlledIsOpen} onToggle={onChange}>
    {({ on, getTogglerProps }) => (
      <div>
        <ResetButton
          {...getTogglerProps({
            className: cx(labelClassName, toggler)
          })}
        >
          <Flex
            align="center"
            direction={
              indicatorPosition && indicatorPosition === "left"
                ? "row"
                : "row-reverse"
            }
          >
            <FlexItem flex="shrink">
              <Icon
                shape={
                  on ? SystemIcons.TriangleDown : SystemIcons.TriangleRight
                }
                size="xs"
              />
            </FlexItem>
            <FlexItem>{label}</FlexItem>
          </Flex>
        </ResetButton>
        {/* TODO: investigate whether display: none is a11y-friendly in this situation */}
        <div className={cx({ [display("none")]: !on })}>{children}</div>
      </div>
    )}
  </Toggle>
);

Expandable.defaultProps = {
  indicatorPosition: "left"
};

export default Expandable;
