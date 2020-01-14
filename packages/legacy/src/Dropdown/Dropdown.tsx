import classNames from "classnames";
import GeminiScrollbar from "react-gemini-scrollbar";
import React from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";

import DOMUtil from "../Util/DOMUtil";
import DropdownListTrigger from "./DropdownListTrigger";
import Overlay from "../../../shared/components/Overlay";

import { injectGlobalDropdownStyles } from "./styles";

export interface MenuItem {
  className?: string;
  html?: React.ReactNode;
  id: string | number;
  onClick?: () => void;
  selectable?: boolean;
  selectedHtml?: string | object;
}

interface DropdownProps {
  anchorRight?: boolean;
  persistentID?: string | number;
  items: MenuItem[];
  initialID?: string | number;
  matchButtonWidth?: boolean;
  onItemSelection?: (...args: any[]) => any;
  scrollContainer?: object | string;
  scrollContainerParentSelector?: string;
  transition?: boolean;
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionExitTimeout?: number;
  trigger?: JSX.Element;
  useGemini?: boolean;
  disabled?: boolean;
  buttonClassName?: string;
  dropdownMenuClassName?: string;
  dropdownMenuListClassName?: string;
  dropdownMenuListItemClassName?: string;
  wrapperClassName?: string;
}

const METHODS_TO_BIND = [
  "closeDropdown",
  "handleMenuToggle",
  "handleExternalClick",
  "handleKeyDown",
  "handleWrapperBlur"
];

export class Dropdown extends React.Component<DropdownProps, any> {
  public static defaultProps: Partial<DropdownProps> = {
    scrollContainer: window,
    transitionName: "dropdown-menu",
    transitionEnterTimeout: 250,
    transitionExitTimeout: 250,
    onItemSelection: () => undefined,
    useGemini: true,
    trigger: <DropdownListTrigger />
  };

  private container;
  private currentBlurTimeout;
  private dropdownMenuRef = React.createRef<any>();
  private dropdownWrapperRef = React.createRef<any>();

  constructor(props) {
    super(props);

    this.state = {
      maxDropdownHeight: null,
      menuDirection: "down",
      menuHeight: null,
      menuPositionStyle: null,
      isOpen: false,
      renderHidden: false,
      selectedID: null
    };

    METHODS_TO_BIND.forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  UNSAFE_componentWillMount() {
    const props = this.props;
    if (!props.persistentID) {
      this.setState({ selectedID: props.initialID });
    }
  }

  componentDidMount() {
    this.container = this.getScrollContainer();
    this.determineOptimalMenuLocation();
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      window.addEventListener("resize", this.closeDropdown);
    } else {
      window.removeEventListener("resize", this.closeDropdown);
    }
  }

  UNSAFE_componentWillUpdate(_, nextState) {
    // If the open state changed, add or remove listener as needed.
    if (nextState.isOpen !== this.state.isOpen) {
      if (nextState.isOpen) {
        this.addKeydownListener();
        this.addScrollListener();
      } else {
        this.removeKeydownListener();
        this.removeScrollListener();
      }
    }
  }

  handleExternalClick() {
    this.closeDropdown();
  }

  handleKeyDown(event) {
    // keycode 27 is ESC
    if (event.keyCode === 27) {
      this.closeDropdown();
    }
  }

  handleItemClick(item) {
    const props = this.props;
    if (props.onItemSelection) {
      props.onItemSelection(item);
    }

    const newState: any = { isOpen: false };
    // Only set the selectedID if persistentID is not set
    if (!props.persistentID) {
      newState.selectedID = item.id;
    }

    this.setState(newState);
    this.removeBlurTimeout();
  }

  handleWrapperBlur() {
    this.removeBlurTimeout();

    this.currentBlurTimeout = setTimeout(() => {
      this.closeDropdown();
    }, 150);

    // We need to remove focus from the button to avoid this event firing again
    // when we open the dropdown
    window.focus();
  }

  handleMenuToggle(e) {
    e.stopPropagation();

    if (this.state.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }

    this.removeBlurTimeout();
  }

  addKeydownListener() {
    document.body.addEventListener("keydown", this.handleKeyDown);
  }

  addScrollListener() {
    if (this.container && this.container.current) {
      this.container.current.addEventListener("scroll", this.closeDropdown);
    }
  }

  removeKeydownListener() {
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }

  removeScrollListener() {
    if (this.container && this.container.current) {
      this.container.current.removeEventListener("scroll", this.closeDropdown);
    }
  }

  removeBlurTimeout() {
    if (this.currentBlurTimeout) {
      global.clearTimeout(this.currentBlurTimeout);
    }
  }

  determineOptimalMenuLocation() {
    let height: any = null;
    let menuDirection = this.state.menuDirection;
    const menuPositionStyle: any = {};
    const spaceAroundDropdownButton = DOMUtil.getNodeClearance(
      this.dropdownWrapperRef.current
    );
    const dropdownChildHeight =
      this.dropdownMenuRef && this.dropdownMenuRef.current
        ? this.dropdownMenuRef.current.firstChild.clientHeight
        : 0;
    const menuHeight = this.state.menuHeight || dropdownChildHeight;
    const isMenuTallerThanBottom =
      menuHeight > spaceAroundDropdownButton.bottom;
    const isMenuTallerThanTop = menuHeight > spaceAroundDropdownButton.top;
    const isMenuShorterThanTop = !isMenuTallerThanTop;
    const isTopTallerThanBottom =
      spaceAroundDropdownButton.top > spaceAroundDropdownButton.bottom;
    // If the menu height is larger than the space available on the bottom and
    // less than the space available on top, then render it up. If the height
    // of the menu exceeds the space below and above, but there is more space
    // above than below, render it up. Otherwise, render down.
    if (
      (isMenuTallerThanBottom && isMenuShorterThanTop) ||
      (isMenuTallerThanBottom && isMenuTallerThanTop && isTopTallerThanBottom)
    ) {
      menuDirection = "up";
      menuPositionStyle.bottom =
        spaceAroundDropdownButton.bottom +
        spaceAroundDropdownButton.boundingRect.height;
      menuPositionStyle.top = "auto";
      height = spaceAroundDropdownButton.top;
    } else {
      menuDirection = "down";
      menuPositionStyle.bottom = "auto";
      menuPositionStyle.top =
        spaceAroundDropdownButton.top +
        spaceAroundDropdownButton.boundingRect.height;
      height = spaceAroundDropdownButton.bottom;
    }

    if (this.props.matchButtonWidth) {
      menuPositionStyle.left = spaceAroundDropdownButton.left;
      menuPositionStyle.right = spaceAroundDropdownButton.right;
    } else if (this.props.anchorRight) {
      menuPositionStyle.left = "auto";
      menuPositionStyle.right = spaceAroundDropdownButton.right;
    } else {
      menuPositionStyle.left = spaceAroundDropdownButton.left;
      menuPositionStyle.right = "auto";
    }

    // We assume that 125 pixels is the smallest height we should render.
    if (height < 125) {
      height = 125;
    }

    this.setState({
      menuDirection,
      maxDropdownHeight: height,
      menuHeight,
      menuPositionStyle,
      renderHidden: false
    });
  }

  openDropdown() {
    const state = { ...this.state };

    state.isOpen = true;

    // If we don't already know the menu height, we need to set the menu
    // position to a default state to trigger its recalculation on the next
    // render.
    if (
      this.state.menuHeight == null &&
      this.dropdownWrapperRef &&
      this.dropdownWrapperRef.current
    ) {
      const buttonPosition = this.dropdownWrapperRef.current.getBoundingClientRect();

      state.menuDirection = "down";
      state.menuPositionStyle = {
        top: buttonPosition.top + buttonPosition.height,
        left: buttonPosition.left
      };
    }

    this.setState(state);
  }

  closeDropdown() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false, renderHidden: false });
    }
  }

  getMenuItems(items) {
    const selectedID = this.getSelectedID();

    return items.map(item => {
      const classSet = classNames(
        {
          "is-selectable": item.selectable !== false,
          "is-selected": item.id === selectedID
        },
        item.className,
        this.props.dropdownMenuListItemClassName
      );

      let handleUserClick: any = null;

      if (item.selectable !== false) {
        handleUserClick = this.handleItemClick.bind(this, item);
      }

      return (
        <li
          className={classSet}
          key={item.id}
          onClick={handleUserClick}
          role="button"
        >
          {item.html}
        </li>
      );
    });
  }

  getScrollContainer() {
    let { scrollContainer, scrollContainerParentSelector } = this.props;

    if (typeof scrollContainer === "string") {
      // Find the closest scrolling element by the specified selector.
      scrollContainer =
        DOMUtil.closest(ReactDOM.findDOMNode(this), scrollContainer) || window;

      const { parentElement } = scrollContainer as any;

      // If the user specified scrollContainerParentSelector, we check to see
      // if the parent scrolling element matches the specified parent selector.
      if (
        scrollContainer !== window &&
        scrollContainerParentSelector != null &&
        parentElement != null &&
        parentElement[DOMUtil.matchesFn](scrollContainerParentSelector)
      ) {
        scrollContainer = parentElement;
      }
    }

    return scrollContainer;
  }

  getSelectedID() {
    return this.props.persistentID || this.state.selectedID;
  }

  getSelectedItem() {
    return this.props.items.find(item => item.id === this.getSelectedID());
  }

  render() {
    // Set a key based on the menu height so that React knows to keep the
    // the DOM element around while we are measuring it.
    // const { props, state } = this;
    let dropdownMenu = <div key="placeholder-element" />;
    const dropdownMenuClassSet = classNames(
      this.state.menuDirection,
      this.props.dropdownMenuClassName
    );
    const { items, trigger = <DropdownListTrigger /> } = this.props;
    const transitionName = `${this.props.transitionName}-${
      this.state.menuDirection
    }`;
    const wrapperClassSet = classNames(
      this.state.menuDirection,
      this.props.wrapperClassName,
      {
        open: this.state.isOpen
      }
    );

    if (this.state.isOpen) {
      let dropdownMenuItems = (
        <ul className="dropdown-menu-items">{this.getMenuItems(items)}</ul>
      );

      // Render with Gemini scrollbar if the dropdown's height should be
      // constrainted.
      if (this.state.menuHeight >= this.state.maxDropdownHeight) {
        let height: number | string = "auto";

        // Remove 30 pixels from the dropdown height to account for offset
        // positioning from the dropdown button.
        if (this.state.maxDropdownHeight > 30) {
          height = this.state.maxDropdownHeight - 30;
        }

        const dropdownMenuStyle = { height };

        if (this.props.useGemini && height !== "auto") {
          dropdownMenuItems = (
            <GeminiScrollbar
              autoshow={true}
              className="container-scrollable"
              style={dropdownMenuStyle}
            >
              {dropdownMenuItems}
            </GeminiScrollbar>
          );
        } else {
          dropdownMenuItems = (
            <div className="container-scrollable" style={dropdownMenuStyle}>
              {dropdownMenuItems}
            </div>
          );
        }
      }

      dropdownMenu = (
        <span
          key="dropdown-menu-key"
          className={dropdownMenuClassSet}
          role="menu"
          ref={this.dropdownMenuRef}
          style={this.state.menuPositionStyle}
        >
          <div className={this.props.dropdownMenuListClassName}>
            {dropdownMenuItems}
          </div>
        </span>
      );
    }

    if (this.state.renderHidden) {
      dropdownMenu = (
        <div key="concealer" className="dropdown-menu-concealer">
          {dropdownMenu}
        </div>
      );
    } else if (this.props.transition) {
      dropdownMenu = (
        <CSSTransition
          in={this.state.isOpen}
          classNames={transitionName}
          timeout={{
            enter: this.props.transitionEnterTimeout,
            exit: this.props.transitionExitTimeout
          }}
        >
          {dropdownMenu}
        </CSSTransition>
      );
    }

    injectGlobalDropdownStyles();

    return (
      <span
        className={wrapperClassSet}
        tabIndex={0}
        onBlur={this.handleWrapperBlur}
        ref={this.dropdownWrapperRef}
      >
        {React.cloneElement(trigger, {
          selectedItem: this.getSelectedItem(),
          onTrigger: this.handleMenuToggle,
          className: this.props.buttonClassName,
          disabled: this.props.disabled
        })}
        <Overlay>{dropdownMenu}</Overlay>
      </span>
    );
  }
}
