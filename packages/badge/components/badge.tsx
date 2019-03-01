import * as React from "react";
import { jsx } from "@emotion/core";
import { badge } from "../style";

export interface BadgeProps {
  appearance?:
    | "default"
    | "success"
    | "primary"
    | "warning"
    | "danger"
    | "outline";
  children: JSX.Element | string;
}

export class Badge extends React.PureComponent<BadgeProps, {}> {
  public static defaultProps: Partial<BadgeProps> = {
    appearance: "default"
  };

  public render() {
    const { appearance, children } = this.props;

    return <span className={badge(appearance)}>{children}</span>;
  }
}

export default Badge;
