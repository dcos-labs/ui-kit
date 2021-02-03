import React from "react";
import { css } from "@emotion/css";

import Dropdownable, { Direction } from "../../components/Dropdownable";
import DropdownStuffContainer from "./DropdownStuffContainer";
import { PrimaryButton } from "../../../button";

class DropdownStory extends React.PureComponent<
  { preferredDirections: Direction[] },
  { isOpen: boolean }
> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      isOpen: false
    });
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  render() {
    const { preferredDirections, children } = this.props;

    const containerStyle = css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    `;

    return (
      <div className={containerStyle}>
        <Dropdownable
          isOpen={this.state.isOpen}
          onClose={this.handleClose}
          preferredDirections={preferredDirections}
          dropdown={
            <DropdownStuffContainer>
              <p>Positioned relative to children</p>
              <p>Click outside to dismiss</p>
              <p>Also try resizing</p>
            </DropdownStuffContainer>
          }
        >
          <PrimaryButton onClick={this.handleOpen}>{children}</PrimaryButton>
        </Dropdownable>
      </div>
    );
  }
}

export default DropdownStory;
