import * as React from "react";
import { jsx } from "@emotion/core";

import { InteractionModeEngine } from "../../utilities/components/interactionMode";

class FocusStyleManager extends React.PureComponent<
  { focusEnabledClass: string; children: string | React.ReactNode },
  {}
> {
  public focusWrapperRef = {};

  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
  }

  public componentDidMount() {
    const focusEngine = new InteractionModeEngine(
      this.focusWrapperRef as Element,
      this.props.focusEnabledClass || "focus-enabled",
      document.documentElement as Element
    );
    focusEngine.start();
  }

  public render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      ref: this.setRef
    });
  }

  private setRef(ref: any) {
    this.focusWrapperRef = ref;
  }
}

export default FocusStyleManager;
