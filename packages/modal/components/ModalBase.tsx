import * as React from "react";
import ReactDOM from "react-dom";
import { cx } from "@emotion/css";
import { Transition } from "react-transition-group";
import FocusLock from "react-focus-lock";
import {
  modal,
  modalWidth,
  modalPreTransitionStyle,
  modalTransitionStyles,
  scrim,
  scrimPreTransitionStyle,
  scrimTransitionStyles,
  centerDialogWrapper
} from "../style";
import ModalContents from "./ModalContents";
import Overlay from "../../shared/components/Overlay";

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
  /** A selector for which element gets focus when the modal opens. Uses `document.querySelector` under the hood */
  initialFocus?: string;
  /** Function that gets called when the modal is closed */
  onClose: (event?: React.SyntheticEvent<HTMLElement>) => void;
  /** Which size modal to render. ⚠️Do not use this directly⚠️ */
  size?: ModalSizes;
  /**
   * human-readable selector used for writing tests
   */
  ["data-cy"]?: string;
  /**
   * which DOM node the modal will attach to
   */
  overlayRoot?: HTMLElement;
  /**
   * the ID attribute that is passed to the modal dialog box
   */
  id?: string;
}

const animationDuration = 250;

class ModalBase extends React.PureComponent<ModalBaseProps, {}> {
  public static defaultProps: Partial<ModalBaseProps> = {
    isAnimated: true
  };

  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.setInitialFocus = this.setInitialFocus.bind(this);
  }

  public componentDidUpdate() {
    if (this.props.initialFocus && this.props.isOpen) {
      this.setInitialFocus(this.props.initialFocus);
    }
  }

  public onKeyDown(e) {
    if (e.key === "Escape") {
      this.props.onClose(e);
      e.stopPropagation();
    }
  }

  public render() {
    const {
      children,
      isAnimated,
      size,
      isOpen,
      "data-cy": dataCy,
      overlayRoot,
      id
    } = this.props;
    const modalSize = size || ModalSizes.M;

    return (
      <Transition
        timeout={{ enter: 0, exit: animationDuration }}
        in={isOpen}
        unmountOnExit={true}
      >
        {state => {
          return (
            <Overlay overlayRoot={overlayRoot}>
              <FocusLock>
                <div
                  role="button"
                  tabIndex={-1}
                  className={cx(scrim, {
                    [scrimPreTransitionStyle(animationDuration)]: isAnimated,
                    [scrimTransitionStyles[state]]: isAnimated
                  })}
                  onClick={this.props.onClose}
                />
                <div className={centerDialogWrapper}>
                  <div
                    className={cx(modal, modalWidth[modalSize], {
                      [modalPreTransitionStyle(animationDuration)]: isAnimated,
                      [modalTransitionStyles[state]]: isAnimated
                    })}
                    role="dialog"
                    onKeyDown={this.onKeyDown}
                    tabIndex={-1}
                    id={id}
                  >
                    <ModalContents
                      isOpen={isOpen}
                      onClose={this.props.onClose}
                      data-cy={dataCy}
                    >
                      {children}
                    </ModalContents>
                  </div>
                </div>
              </FocusLock>
            </Overlay>
          );
        }}
      </Transition>
    );
  }

  private setInitialFocus(initialFocus) {
    const domNodeToFind = document.querySelector(initialFocus);

    if (domNodeToFind) {
      const node = ReactDOM.findDOMNode(domNodeToFind) as Element;
      node.setAttribute("data-autofocus", "true");
    }
  }
}

export default ModalBase;
