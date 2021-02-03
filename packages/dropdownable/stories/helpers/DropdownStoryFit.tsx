import React from "react";
import { css } from "@emotion/css";

import Dropdownable, { Direction } from "../../components/Dropdownable";
import DropdownStuffContainer from "./DropdownStuffContainer";
import { PrimaryButton, SecondaryButton } from "../../../button";

class DropdownStoryFit extends React.PureComponent<
  {},
  { isOpen: boolean; expanded: boolean }
> {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      isOpen: false
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
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
    const { children } = this.props;

    const containerStyle = css({
      display: "flex",
      ["align-items"]: "center",
      ["justify-content"]: "flex-end",
      ["min-height"]: this.state.expanded ? "400px" : "40px"
    });

    return (
      <div>
        <div className={containerStyle}>
          <Dropdownable
            isOpen={this.state.isOpen}
            onClose={this.handleClose}
            preferredDirections={[Direction.TopRight, Direction.BottomRight]}
            dropdown={
              <DropdownStuffContainer>
                <p>I prefer to be positioned on the top</p>
                <p>Click outside to dismiss</p>
                <p>Also try resizing</p>
                <p>Click the other button to make more vertical space</p>
                <p>Click the other button to make more vertical space</p>
                <p>Click the other button to make more vertical space</p>
                <p>Click the other button to make more vertical space</p>
                <p>Click the other button to make more vertical space</p>
              </DropdownStuffContainer>
            }
          >
            <PrimaryButton onClick={this.handleOpen}>{children}</PrimaryButton>
          </Dropdownable>
        </div>
        <SecondaryButton onClick={this.toggleExpand}>
          {this.state.expanded ? "Collapse" : "Expand"}
        </SecondaryButton>
      </div>
    );
  }
}

export default DropdownStoryFit;
