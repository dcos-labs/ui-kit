import * as React from "react";
import { cx } from "@emotion/css";
import {
  toast,
  toastActions,
  toastDesc,
  toastTitle,
  toastDismiss
} from "../style";
import {
  inverseColorMode,
  display,
  flex,
  flexItem,
  margin,
  padding
} from "../../shared/styles/styleUtils";
import Clickable from "../../clickable/components/clickable";
import * as dt from "../../design-tokens/build/js/designTokens";
import { Icon } from "../../icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";

export type ToastId = React.ReactText | undefined;

export interface ToastProps {
  title: React.ReactElement<HTMLElement> | string;
  description?: React.ReactElement<HTMLElement> | string;
  id: ToastId;
  appearance: "default" | "success" | "warning" | "danger";
  autodismiss?: boolean;
  onDismiss?: (event?: React.SyntheticEvent<HTMLElement>) => void;
  dismissToast?: (dismissedToastId: ToastId) => void;
  primaryAction?: React.ReactElement<HTMLElement>;
  secondaryAction?: React.ReactElement<HTMLElement>;
}

const SuccessIcon = (
  <Icon shape={SystemIcons.CircleCheck} color={dt.green} size="xs" />
);
const WarningIcon = (
  <Icon shape={SystemIcons.Yield} color={dt.yellow} size="xs" />
);
const DangerIcon = (
  <Icon shape={SystemIcons.CircleClose} color={dt.red} size="xs" />
);
const getIconForAppearance = (appearance: ToastProps["appearance"]) => {
  switch (appearance) {
    case "danger":
      return DangerIcon;
    case "success":
      return SuccessIcon;
    case "warning":
      return WarningIcon;
  }
};

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
    const dataCy = `toast toast.${appearance}`;

    return (
      <div
        className={cx(
          toast,
          inverseColorMode,
          margin("bottom", "xxs"),
          padding("top", "xs"),
          padding("right", "xs"),
          padding("left", "xs"),
          display("grid")
        )}
        role={isUrgentMessage ? "alert" : "log"}
        aria-relevant="all"
        aria-atomic="true"
        data-cy={dataCy}
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
              {getIconForAppearance(appearance)}
            </div>
          )}
          <div className={flexItem("grow")}>{title}</div>
        </div>
        {description && (
          <div
            className={cx(toastDesc, padding("bottom", "xs"))}
            data-cy="toast-description"
          >
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
            data-cy="toast-actions"
          >
            {primaryAction && (
              <span className={padding("left")}>{primaryAction}</span>
            )}
            {secondaryAction && <span>{secondaryAction}</span>}
          </div>
        )}
        <Clickable tabIndex={0} action={this.handleDismiss}>
          <span className={toastDismiss}>
            <Icon shape={SystemIcons.Close} color="inherit" size="xs" />
          </span>
        </Clickable>
      </div>
    );
  }

  private handleDismiss(e) {
    const { dismissToast, onDismiss, id } = this.props;
    if (dismissToast) {
      dismissToast(id);
    } else if (onDismiss) {
      onDismiss(e);
    }
  }
}

export default Toast;
