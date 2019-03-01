import React from "react";
import { css } from "emotion";

import Dropdownable, { Direction } from "../../components/Dropdownable";
import DropdownStuffContainer from "./DropdownStuffContainer";
import { PrimaryButton } from "../../../button";

class DropdownStory extends React.PureComponent<
  { preferredDirections: Direction[] },
  { open: boolean }
> {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleOpen() {
    this.setState({ open: true });
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
          open={this.state.open}
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
