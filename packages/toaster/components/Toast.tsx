import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import {
  toast,
  toastActions,
  toastDesc,
  toastTitle,
  toastDismiss
} from "../style";
import {
  darkMode,
  display,
  flex,
  flexItem,
  margin,
  padding,
  tintSVG
} from "../../shared/styles/styleUtils";
import Clickable from "../../clickable/components/clickable";
import { green, red, yellow } from "../../design-tokens/build/js/designTokens";
import { CloseIcon } from "../../shared/icons";

export type ToastId = React.ReactText | undefined;

export interface ToastProps {
  title: React.ReactElement<HTMLElement> | string;
  description?: React.ReactElement<HTMLElement> | string;
  id: ToastId;
  appearance?: "default" | "success" | "warning" | "danger";
  autodismiss?: boolean;
  onDismiss?: (event?: React.SyntheticEvent<HTMLElement>) => void;
  dismissToast?: (dismissedToastId: ToastId) => void;
  primaryAction?: React.ReactElement<HTMLElement>;
  secondaryAction?: React.ReactElement<HTMLElement>;
}

const SuccessIcon = props => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM6.5 9.263L4.619 7.38 3.38 8.62 6.5 11.737l6.119-6.118L11.38 4.38 6.5 9.263z"
      fill-rule="evenodd"
    />
  </svg>
);

const DangerIcon = props => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm-2.5-4.5L8 9l2.5 2.5 1-1L9 8l2.5-2.5-1-1L8 7 5.5 4.5l-1 1L7 8l-2.5 2.5 1 1z"
      fill-rule="evenodd"
    />
  </svg>
);

const WarningIcon = props => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.44 2.048c.782-1.398 2.339-1.396 3.12 0l5.133 9.17c.781 1.396.003 2.782-1.56 2.782H2.867c-1.566 0-2.34-1.388-1.56-2.783l5.133-9.17zM8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-.53-3.238A.282.282 0 0 0 7.752 9h.496c.139 0 .266-.115.282-.238l.346-2.773C8.945 5.443 8.556 5 8 5a.86.86 0 0 0-.876.989l.346 2.773z"
      fill-rule="nonzero"
    />
  </svg>
);

class Toast extends React.PureComponent<ToastProps, {}> {
  public static defaultProps: Partial<ToastProps> = {
    appearance: "default",
    autodismiss: false
  };

  constructor(props) {
    super(props);

    this.handleDismiss = this.handleDismiss.bind(this);
  }

  public render() {
    const {
      title,
      description,
      appearance,
      primaryAction,
      secondaryAction
    } = this.props;
    const isUrgentMessage = appearance === "danger" || appearance === "warning";
    const getStatusIcon = status => {
      switch (status) {
        case "danger":
          return <DangerIcon className={tintSVG(red)} />;
        case "success":
          return <SuccessIcon className={tintSVG(green)} />;
        case "warning":
          return <WarningIcon className={tintSVG(yellow)} />;
      }
    };

    return (
      <div
        className={cx(
          toast,
          darkMode,
          margin("bottom", "xxs"),
          padding("top", "xs"),
          padding("right", "xs"),
          padding("left", "xs"),
          display("grid")
        )}
        role={isUrgentMessage ? "alert" : "log"}
        aria-relevant="all"
        aria-atomic="true"
      >
        <div
          className={cx(
            toastTitle,
            flex({ align: "center" }),
            padding("bottom", "xs")
          )}
        >
          {appearance !== "default" && (
            <div
              className={cx(
                display("inherit"),
                flexItem("shrink"),
                padding("right", "s")
              )}
            >
              {getStatusIcon(appearance)}
            </div>
          )}
          <div className={flexItem("grow")}>{title}</div>
        </div>
        {description && (
          <div className={cx(toastDesc, padding("bottom", "xs"))}>
            {description}
          </div>
        )}
        {(primaryAction || secondaryAction) && (
          <div
            className={cx(
              toastActions,
              flex({ direction: "row-reverse" }),
              padding("bottom", "xs")
            )}
          >
            {primaryAction && (
              <span className={padding("left")}>{primaryAction}</span>
            )}
            {secondaryAction && <span>{secondaryAction}</span>}
          </div>
        )}
        <Clickable tabIndex={0} action={this.handleDismiss}>
          <span className={toastDismiss}>
            <CloseIcon />
          </span>
        </Clickable>
      </div>
    );
  }

  private handleDismiss(e) {
    const { dismissToast, onDismiss, id } = this.props;
    if (dismissToast) {
      dismissToast(id);
    }
    if (onDismiss) {
      onDismiss(e);
    }
  }
}

export default Toast;
