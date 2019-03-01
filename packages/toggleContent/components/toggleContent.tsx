import * as React from "react";
import { jsx } from "@emotion/core";
import Clickable from "../../clickable/components/clickable";
import { style } from "../style";

export interface ToggleContentState {
  isOn: boolean;
}

export interface ToggleContentProps {
  contentOn: JSX.Element | string;
  contentOff: JSX.Element | string;
  tabIndex?: string | number;
}

export class ToggleContent extends React.PureComponent<
  ToggleContentProps,
  ToggleContentState
> {
  static defaultProps = {
    tabIndex: -1
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isOn: true
    };
  }

  public handleClick(): void {
    if (!window.getSelection().toString()) {
      this.setState({
        isOn: !this.state.isOn
      });
    }
  }

  public render() {
    const { tabIndex, contentOn, contentOff } = this.props;
    let content = contentOn;

    if (!this.state.isOn) {
      content = contentOff;
    }

    return (
      <Clickable tabIndex={tabIndex} action={this.handleClick}>
        <span className={style}>{content}</span>
      </Clickable>
    );
  }
}

export default ToggleContent;
