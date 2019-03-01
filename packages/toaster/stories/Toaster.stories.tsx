import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { action } from "@storybook/addon-actions";
import { Toaster, Toast } from "..";
import { ToastProps } from "../components/Toast";
import { fontSizes } from "../../shared/styles/typography";
import { purple } from "../../design-tokens/build/js/designTokens";

const readme = require("../README.md");

let addedToastId = 0;
const toastTitle = "I have a message for you";
const fakeButtonStyles = {
  ["-webkit-appearance"]: "none",
  ["-moz-appearance"]: "none",
  background: "transparent",
  border: "none",
  color: purple,
  cursor: "pointer",
  fontSize: fontSizes.s,
  padding: 0
};

export interface ToastContainerProps {
  children: Array<React.ReactElement<ToastProps>>;
}

export interface ToastContainerState {
  toasts: Array<React.ReactElement<ToastProps>>;
}

class ToasterContainer extends React.PureComponent<
  ToastContainerProps,
  ToastContainerState
> {
  constructor(props) {
    super(props);

    this.state = {
      toasts: this.props.children
    };

    this.addToast = this.addToast.bind(this);
  }

  addToast(toast: Array<React.ReactElement<ToastProps>>) {
    this.setState({
      toasts: toast
    });
  }

  render() {
    const handleToastAdd = () => {
      const newToastId = addedToastId++;
      const newToast = [
        // tslint:disable:jsx-wrap-multiline
        <Toast
          autodismiss={true}
          id={`toast-${newToastId + 1}`}
          key={newToastId + 1}
          title={`New message ${newToastId + 1}`}
        />
        // tslint:enable
      ];
      this.addToast(newToast);
    };

    return (
      <div>
        <Toaster>{this.state.toasts}</Toaster>
        <button onClick={handleToastAdd}>Make me toast</button>
      </div>
    );
  }
}

storiesOf("Toaster", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("default", () => (
    <Toaster>{[<Toast title={toastTitle} key={0} id="default" />]}</Toaster>
  ))
  .addWithInfo("danger", () => (
    <Toaster>
      {[<Toast title={toastTitle} key={0} id="danger" appearance="danger" />]}
    </Toaster>
  ))
  .addWithInfo("success", () => (
    <Toaster>
      {[<Toast title={toastTitle} key={0} id="success" appearance="success" />]}
    </Toaster>
  ))
  .addWithInfo("warning", () => (
    <Toaster>
      {[<Toast title={toastTitle} key={0} id="warning" appearance="warning" />]}
    </Toaster>
  ))
  .addWithInfo("description", () => (
    <Toaster>
      {[
        <Toast
          title={toastTitle}
          description="And this is a short description to provide more info about the message"
          key={0}
          id="description"
        />
      ]}
    </Toaster>
  ))
  .addWithInfo("autodismiss", () => (
    <ToasterContainer>
      {[
        <Toast
          title="Hover me or I'll disappear"
          autodismiss={true}
          key={0}
          id="autodismiss"
        />
      ]}
    </ToasterContainer>
  ))
  .addWithInfo("with dismiss callback", () => (
    <Toaster>
      {[
        <Toast
          title={toastTitle}
          key={0}
          onDismiss={action("The toast has been dismissed")}
          id="dismissCallback"
        />
      ]}
    </Toaster>
  ))
  .addWithInfo("with 1 action", () => (
    <Toaster>
      {[
        <Toast
          title={toastTitle}
          key={0}
          primaryAction={
            <button
              onClick={action("primary action clicked")}
              style={fakeButtonStyles}
            >
              primaryAction
            </button>
          }
          id="oneAction"
        />
      ]}
    </Toaster>
  ))
  .addWithInfo("with 2 actions", () => (
    <Toaster>
      {[
        <Toast
          title={toastTitle}
          key={0}
          primaryAction={
            <button
              onClick={action("primaryAction triggered")}
              style={fakeButtonStyles}
            >
              primaryAction
            </button>
          }
          secondaryAction={
            <button
              onClick={action("secondaryAction triggered")}
              style={fakeButtonStyles}
            >
              secondaryAction
            </button>
          }
          id="twoActions"
        />
      ]}
    </Toaster>
  ));
