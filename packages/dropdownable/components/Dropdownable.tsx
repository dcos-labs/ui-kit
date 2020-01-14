import React from "react";
import styled, { css } from "react-emotion";

import Overlay from "../../shared/components/Overlay";
import DropdownContents from "./DropdownContents";
import resizeEventManager from "../../utilities/resizeEventManager";
import { zIndexDropdownable } from "../../design-tokens/build/js/designTokens";

export enum Direction {
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  TopLeft = "top-left",
  TopRight = "top-right",
  TopCenter = "top-center"
}

const DEFAULT_DIRECTION_PREFERENCES = [
  Direction.BottomLeft,
  Direction.BottomRight,
  Direction.TopRight,
  Direction.TopLeft
];

const Container = styled("div")`
  position: relative;
`;

export interface DropdownableProps {
  open: boolean;
  dropdown: React.ReactElement<any>;
  preferredDirections?: Direction[];
  onClose?: () => void;
  overlayRoot?: HTMLElement;
}

interface PositionCoord {
  top: number;
  left: number;
}

interface State {
  direction: Direction;
  position: PositionCoord;
}

interface Dimension {
  width: number;
  height: number;
}

const METHODS_TO_BIND = [
  "getDropdown",
  "setPosition",
  "setPositionFromCurrentProps",
  "calculateBestDirection",
  "positionForDirection",
  "childBounds",
  "windowDimensions",
  "dropdownDimensions"
];

class Dropdownable extends React.Component<DropdownableProps, State> {
  public static defaultProps: Partial<DropdownableProps> = {
    preferredDirections: DEFAULT_DIRECTION_PREFERENCES
  };

  private child = React.createRef<HTMLDivElement>();
  private dropdown = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);

    this.state = {
      direction: Direction.BottomLeft,
      position: {
        top: 0,
        left: 0
      }
    };

    METHODS_TO_BIND.forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  componentDidMount() {
    resizeEventManager.add(this.setPositionFromCurrentProps);
    this.setPositionFromCurrentProps();
  }

  componentWillUnmount() {
    resizeEventManager.remove(this.setPositionFromCurrentProps);
  }

  UNSAFE_componentWillReceiveProps(nextProps: DropdownableProps) {
    if (nextProps.open) {
      this.setPosition(nextProps);
    }
  }

  render() {
    return (
      <Container>
        <div ref={this.child}>{this.props.children}</div>
        {this.getOverlay()}
      </Container>
    );
  }

  getOverlay() {
    const { position } = this.state;
    const { open, overlayRoot } = this.props;

    const overlayStyle = css({
      top: `${position.top}px`,
      left: `${position.left}px`,
      position: "absolute",
      transform: `scale(${open ? 1 : 0})`,
      opacity: open ? 1 : 0,
      "z-index": zIndexDropdownable
    });
    return (
      <Overlay overlayRoot={overlayRoot} className={overlayStyle}>
        {this.getDropdown()}
      </Overlay>
    );
  }

  getDropdown() {
    const { open, dropdown, onClose } = this.props;

    return (
      <div ref={this.dropdown}>
        <DropdownContents open={open} onClose={onClose}>
          {React.cloneElement(dropdown, {
            direction: this.state.direction
          })}
        </DropdownContents>
      </div>
    );
  }

  setPositionFromCurrentProps() {
    if (!this.props.open) {
      return;
    }
    this.setPosition(this.props);
  }

  setPosition(props: DropdownableProps) {
    const dropdownDimensions: Dimension = this.dropdownDimensions();
    const windowDimensions: Dimension = this.windowDimensions();
    const childBounds: ClientRect = this.childBounds();
    const direction: Direction = this.calculateBestDirection(
      props.preferredDirections,
      childBounds,
      dropdownDimensions,
      windowDimensions
    );

    this.setState({
      direction,
      position: this.positionForDirection(
        direction,
        childBounds,
        dropdownDimensions
      )
    });
  }

  calculateBestDirection(
    preferredDirections,
    childBounds,
    dropdownDimensions,
    windowDimensions
  ): Direction {
    // Determine if there is enough space in each direction to fit dropdown
    const triggerCenter = childBounds.width / 2 + childBounds.left;
    const possibleVertDirections = {
      top: dropdownDimensions.height <= childBounds.top,
      bottom:
        childBounds.bottom + dropdownDimensions.height <=
        windowDimensions.height
    };
    const possibleHorizDirections = {
      left:
        dropdownDimensions.width + childBounds.left <= windowDimensions.width,
      right: childBounds.right - dropdownDimensions.width >= 0,
      center:
        triggerCenter - dropdownDimensions.width / 2 > 0 &&
        triggerCenter + dropdownDimensions.width / 2 < windowDimensions.width
    };

    // Pick the first available preference
    const preferredDirection = preferredDirections.find(direction => {
      const topOrBottom = direction.split("-", 2)[0];
      const leftOrRight = direction.split("-", 2)[1];
      return (
        possibleVertDirections[topOrBottom] &&
        possibleHorizDirections[leftOrRight]
      );
    });

    // If nothing fits, fall back to the first preference
    return preferredDirection || preferredDirections[0];
  }

  positionForDirection(
    direction: Direction,
    childBounds,
    dropdownDimensions
  ): PositionCoord {
    const isTop: boolean =
      direction === Direction.TopLeft ||
      direction === Direction.TopRight ||
      direction === Direction.TopCenter;
    const isLeft: boolean =
      direction === Direction.TopLeft || direction === Direction.BottomLeft;
    const isCenter: boolean =
      direction === Direction.TopCenter || direction === Direction.BottomCenter;

    const getHorizAlignment = () => {
      if (isCenter) {
        return (
          childBounds.x +
          childBounds.width / 2 -
          dropdownDimensions.width / 2 +
          window.scrollX
        );
      } else if (isLeft) {
        return childBounds.left + window.scrollX;
      } else {
        return (
          childBounds.left -
          dropdownDimensions.width +
          childBounds.width +
          window.scrollX
        );
      }
    };

    return {
      top: isTop
        ? childBounds.top - dropdownDimensions.height + window.scrollY
        : childBounds.top + childBounds.height + window.scrollY,
      left: getHorizAlignment()
    };
  }

  childBounds(): ClientRect {
    const child = this.child.current;

    if (child) {
      return child.getBoundingClientRect();
    }

    // child.current should not be null due to React lifecycle but
    // is not guarateed by the type.
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    };
  }

  windowDimensions(): Dimension {
    const body = document.body;
    return { width: body.clientWidth, height: body.clientHeight };
  }

  dropdownDimensions(): Dimension {
    const dropdown = this.dropdown.current!;

    if (dropdown) {
      return {
        width: dropdown.clientWidth,
        height: dropdown.clientHeight
      };
    }

    // dropdown.current should not be null due to React lifecycle but
    // is not guarateed by the type.
    return {
      width: 0,
      height: 0
    };
  }
}

export default Dropdownable;
