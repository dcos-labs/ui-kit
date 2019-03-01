import * as React from "react";
import { jsx, SerializedStyles } from "@emotion/core";
import Toggle from "react-toggled";
import { buttonReset, display, flex } from "../../shared/styles/styleUtils";
import { toggler } from "../style";

export interface ExpandableProps {
  children: React.ReactElement<HTMLElement> | string;
  isOpen?: boolean;
  label: React.ReactElement<HTMLElement> | string;
  labelClassName?: SerializedStyles[];
}

class Expandable extends React.PureComponent<ExpandableProps, {}> {
  public render() {
    const { labelClassName = [], children, label, isOpen } = this.props;

    return (
      <Toggle defaultOn={isOpen ? true : false}>
        {({ on, getTogglerProps }) => (
          <div>
            <button
              css={[
                buttonReset,
                ...labelClassName,
                toggler(on),
                flex({ align: "center", justify: "space-between" })
              ]}
              {...getTogglerProps({})}
            >
              {label}
            </button>
            {/* TODO: investigate whether display: none is a11y-friendly in this situation */}
            <div css={[!on && display("none")]}>{children}</div>
          </div>
        )}
      </Toggle>
    );
  }
}

export default Expandable;
