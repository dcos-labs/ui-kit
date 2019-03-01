import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import FocusTrap from "focus-trap-react";
import { FocusTarget } from "focus-trap";
import { Transition } from "react-transition-group";
import {
  modal,
  modalWidth,
  modalPreTransitionStyle,
  modalTransitionStyles,
  scrim,
  scrimPreTransitionStyle,
  scrimTransitionStyles
} from "../style";
import ModalContents from "./ModalContents";
import Overlay from "../../shared/components/Overlay";
import { flex } from "../../shared/styles/styleUtils";

export enum ModalSizes {
  S = "s",
  M = "m",
  L = "l",
  Fullscreen = "fullscreen"
}

export interface ModalBaseProps {
  children?: React.ReactNode;
  /** Controls whether the modal animates in and out. ⚠️Do not use this directly⚠️ */
  isAnimated?: boolean;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Which element gets focus when the modal opens */
  initialFocus?: FocusTarget;
  /** Function that gets called when the modal is closed */
  onClose: (event?: React.SyntheticEvent<HTMLElement>) => void;
  /** Which size modal to render. ⚠️Do not use this directly⚠️ */
  size?: ModalSizes;
}

const animationDuration = 250;

class ModalBase extends React.PureComponent<ModalBaseProps, {}> {
  public static defaultProps: Partial<ModalBaseProps> = {
    isAnimated: true
  };

  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  public onKeyDown(e) {
    if (e.key === "Escape") {
      this.props.onClose(e);
    }
  }

  public render() {
    const { children, isAnimated, size, initialFocus, isOpen } = this.props;
    const modalSize = size || ModalSizes.M;

    return (
      <Transition
        timeout={{ enter: 0, exit: animationDuration }}
        in={isOpen}
        unmountOnExit={true}
      >
        {state => {
          return (
            <Overlay>
              <div
                className={cx(scrim, {
                  [scrimPreTransitionStyle(animationDuration)]: isAnimated,
                  [scrimTransitionStyles[state]]: isAnimated
                })}
              />
              <FocusTrap
                focusTrapOptions={{
                  initialFocus,
                  escapeDeactivates: false
                }}
                active={true}
                role="dialog"
                className={cx(
                  modal,
                  modalWidth[modalSize],
                  flex({ direction: "column" }),
                  {
                    [modalPreTransitionStyle(animationDuration)]: isAnimated,
                    [modalTransitionStyles[state]]: isAnimated
                  }
                )}
                onKeyDown={this.onKeyDown}
                tabIndex={-1}
              >
                <ModalContents isOpen={isOpen} onClose={this.props.onClose}>
                  {children}
                </ModalContents>
              </FocusTrap>
            </Overlay>
          );
        }}
      </Transition>
    );
  }
}

export default ModalBase;
