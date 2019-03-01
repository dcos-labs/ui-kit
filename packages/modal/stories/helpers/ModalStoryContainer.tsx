import * as React from "react";
import { jsx } from "@emotion/core";
import PrimaryButton from "../../../button/components/PrimaryButton";

export interface ModalStoryContainerProps {
  children: any;
}

export interface ModalStoryContainerState {
  modalIsShown: boolean;
}

class ModalStoryContainer extends React.PureComponent<
  ModalStoryContainerProps,
  ModalStoryContainerState
> {
  constructor(props) {
    super(props);

    this.state = {
      modalIsShown: false
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({
      modalIsShown: true
    });
  }

  hideModal() {
    this.setState({
      modalIsShown: false
    });
  }

  render() {
    return (
      <div>
        {this.props.children({
          isOpen: this.state.modalIsShown,
          onClose: this.hideModal
        })}
        <div style={{ textAlign: "center" }}>
          <PrimaryButton onClick={this.showModal}>Show my modal</PrimaryButton>
        </div>
      </div>
    );
  }
}

export default ModalStoryContainer;
