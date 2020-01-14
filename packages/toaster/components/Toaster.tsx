import * as React from "react";
import { cx } from "emotion";
import { TransitionGroup, Transition } from "react-transition-group";
import { ToastProps, ToastId } from "./Toast";
import { toaster, preTransitionStyle, transitionStyles } from "../style";
import { margin, marginAt, listReset } from "../../shared/styles/styleUtils";

export interface ToasterProps {
  children?: Array<React.ReactElement<ToastProps>>;
}

export interface ToasterState {
  toasts?: Array<React.ReactElement<ToastProps>>;
}

export const DELAY_TIME = 3000;
const MARGINAL_DELAY = 1000;

const animationDuration = 300;

class Toaster extends React.PureComponent<ToasterProps, ToasterState> {
  // TODO: write better type for timeouts
  public timeouts: any[] = [];

  constructor(props) {
    super(props);

    this.cloneToast = this.cloneToast.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.clearTimeouts = this.clearTimeouts.bind(this);
    this.restartTimeouts = this.restartTimeouts.bind(this);
    this.setTimer = this.setTimer.bind(this);

    const toastChildren =
      this.props.children && this.props.children.map(this.cloneToast);

    this.state = {
      toasts: toastChildren
    };
  }

  public componentWillUnmount() {
    this.clearTimeouts();
  }

  public componentDidMount() {
    this.restartTimeouts();
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ToasterProps) {
    const currentToasts = this.state.toasts || [];
    const childIds =
      (nextProps.children && nextProps.children.map(toast => toast.props.id)) ||
      [];
    const currentIds = currentToasts.map(toast => toast.props.id);

    if (
      (childIds && !currentIds.every(e => childIds.includes(e))) ||
      !currentIds.length ||
      childIds.length !== currentIds.length
    ) {
      this.setState(
        () => ({
          toasts: (nextProps.children || []).map(this.cloneToast)
        }),
        () => {
          if (this.state.toasts) {
            this.state.toasts
              .filter(t => t.props.autodismiss)
              .map(this.setTimer);
          }
        }
      );
    }
  }

  public render() {
    const toastsToRender = this.state.toasts || [];

    return (
      <div
        className={cx(toaster, margin("all"), marginAt.medium("all", "l"))}
        data-cy="toaster"
      >
        <ol
          onMouseEnter={this.clearTimeouts}
          onMouseLeave={this.restartTimeouts}
          aria-live="assertive"
          className={listReset}
        >
          <TransitionGroup>
            {toastsToRender.map(toast => (
              <Transition
                key={`toastWrapper-${toast.props.id}`}
                timeout={{ enter: 0, exit: animationDuration }}
              >
                {state => {
                  return (
                    <li
                      className={cx(
                        preTransitionStyle(animationDuration),
                        transitionStyles[state]
                      )}
                    >
                      {toast}
                    </li>
                  );
                }}
              </Transition>
            ))}
          </TransitionGroup>
        </ol>
      </div>
    );
  }

  public dismissToast(dismissedToastId: ToastId = "") {
    const currentToasts = this.state.toasts || [];
    const toast = currentToasts.find(
      toast => toast.props.id === dismissedToastId
    );
    if (toast && toast.props.onDismiss) {
      toast.props.onDismiss();
    }
    this.setState({
      toasts: currentToasts.filter(toast => dismissedToastId !== toast.props.id)
    });
  }

  public cloneToast(toast: React.ReactElement<ToastProps>, i: number) {
    const toastProps = {
      key: i,
      id: toast.props.id,
      dismissToast: this.dismissToast,
      autodismiss: toast.props.autodismiss || false
    };
    return React.cloneElement(toast, toastProps);
  }

  public setTimer(toast: React.ReactElement<ToastProps>) {
    const toastKey = toast.key as number;
    if (toast.props.autodismiss) {
      this.timeouts.push(
        setTimeout(() => {
          this.dismissToast(toast.props.id);
        }, DELAY_TIME + MARGINAL_DELAY * toastKey)
      );
    }
  }

  public restartTimeouts() {
    if (this.state.toasts) {
      this.state.toasts.map(this.setTimer);
    }
  }

  public clearTimeouts() {
    this.timeouts.forEach(clearTimeout);
  }
}

export default Toaster;
