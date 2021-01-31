import * as React from "react";
import { cx } from "@emotion/css";
import { TransitionGroup, Transition } from "react-transition-group";
import { ToastProps, ToastId } from "./Toast";
import { toaster, preTransitionStyle, transitionStyles } from "../style";
import { margin, marginAt, listReset } from "../../shared/styles/styleUtils";

export const DELAY_TIME = 3000;
const MARGINAL_DELAY = 1000;
const animationDuration = 300;

type Toast = React.ReactElement<ToastProps>;

interface ToasterProps {
  children?: Toast | Toast[];
}

class Toaster extends React.PureComponent<ToasterProps, { toasts: Toast[] }> {
  public timeouts: NodeJS.Timeout[] = [];

  constructor(props) {
    super(props);

    this.cloneToast = this.cloneToast.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.clearTimeouts = this.clearTimeouts.bind(this);
    this.restartTimeouts = this.restartTimeouts.bind(this);
    this.setTimer = this.setTimer.bind(this);

    this.state = {
      toasts: React.Children.toArray<Toast>(this.props.children).map(
        this.cloneToast
      )
    };
  }

  public componentWillUnmount() {
    this.clearTimeouts();
  }

  public componentDidMount() {
    this.restartTimeouts();
  }

  public componentWillReceiveProps(props: ToasterProps) {
    const children = React.Children.toArray(props.children);
    const childIds = children.map(toast => toast.props.id);
    const currentIds = this.state.toasts.map(toast => toast.props.id);

    if (
      !currentIds.every(e => childIds.includes(e)) ||
      !currentIds.length ||
      childIds.length !== currentIds.length
    ) {
      this.setState(
        () => ({ toasts: children.map(this.cloneToast) }),
        () => {
          this.state.toasts
            ?.filter(t => t.props.autodismiss)
            .map(this.setTimer);
        }
      );
    }
  }

  public render() {
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
            {this.state.toasts.map(toast => (
              <Transition
                key={`toastWrapper-${toast.props.id}`}
                timeout={{ enter: 0, exit: animationDuration }}
              >
                {state => (
                  <li
                    className={cx(
                      preTransitionStyle(animationDuration),
                      transitionStyles[state]
                    )}
                  >
                    {toast}
                  </li>
                )}
              </Transition>
            ))}
          </TransitionGroup>
        </ol>
      </div>
    );
  }

  public dismissToast(id: ToastId = "") {
    this.state.toasts.find(toast => id === toast.props.id)?.props.onDismiss?.();
    this.setState({
      toasts: this.state.toasts.filter(toast => id !== toast.props.id)
    });
  }

  public cloneToast(toast: Toast, i: number): Toast {
    return React.cloneElement(toast, {
      key: i,
      id: toast.props.id,
      dismissToast: this.dismissToast,
      autodismiss: toast.props.autodismiss
    });
  }

  public setTimer(toast: Toast) {
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
    this.state.toasts.map(this.setTimer);
  }

  public clearTimeouts() {
    this.timeouts.forEach(clearTimeout);
  }
}

export default Toaster;
