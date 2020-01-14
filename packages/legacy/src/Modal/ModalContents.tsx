// tslint:disable
import classNames from "classnames/dedupe";
// tslint:enable
import GeminiScrollbar from "react-gemini-scrollbar";
import React from "react";
/**
 * Lifecycle of a Modal:
 * initial page load -> empty TransitionGroup
 * interaction changes open to true -> render modal content without scrollbars
 * get height of content -> rerender modal content and cap the height
 */

import { CSSTransition } from "react-transition-group";

import DOMUtil from "../Util/DOMUtil";
import { ModalProps, ModalState } from "./Modal";

// This value is used to designate "off-limits" vertical space, so that the
// modal never comes into contact with the edge of the viewport.
const MODAL_VERTICAL_INSET_DISTANCE = 48;

const METHODS_TO_BIND = [
  "calculateContentHeight",
  "closeModal",
  "handleBackdropClick",
  "handleKeyDown",
  "handleWindowResize"
];

export default class ModalContents extends React.Component<
  ModalProps,
  ModalState
> {
  public static defaultProps: Partial<ModalProps> = {
    closeByBackdropClick: true,
    transitionNameModal: "modal",
    transitionAppearTimeoutModal: 300,
    transitionEnterTimeoutModal: 300,
    transitionExitTimeoutModal: 300,
    transitionAppear: true,
    transitionEnter: true,
    transitionExit: true,
    useGemini: true,

    // Default classes.
    backdropClass: "modal-backdrop",
    bodyClass: "modal-body-wrapper",
    closeButtonClass: "modal-close",
    footerClass: "modal-footer",
    headerClass: "modal-header",
    modalClass: "modal modal-large",
    scrollContainerClass: "modal-body"
  };

  public lastConstrainedHeight;
  public lastViewportHeight;
  private footerRef = React.createRef<any>();
  private geminiRef = React.createRef<any>();
  private headerRef = React.createRef<any>();
  private innerContentContainerRef = React.createRef<any>();
  private innerContentRef = React.createRef<any>();
  private modalRef = React.createRef<any>();

  constructor(props) {
    super(props);

    this.state = {
      height: null
    };

    METHODS_TO_BIND.forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  componentDidUpdate(prevProps: ModalProps) {
    // If we don't already know the height of the content, we calculate it.
    if (this.props.open) {
      this.lastViewportHeight = Math.ceil(DOMUtil.getViewportHeight());
      window.requestAnimationFrame(this.calculateContentHeight);
    }

    if (this.props.open !== prevProps.open) {
      document.body.classList.toggle("no-overflow");
    }
  }

  UNSAFE_componentWillUpdate(nextProps) {
    // Reset the height of the content to null when the modal is closing so
    // that the height will be recalculated next time it opens.
    if (this.props.open && !nextProps.open) {
      this.setState({ height: null });
      this.removeKeydownListener();
    }

    if (!this.props.open && nextProps.open) {
      this.addKeydownListener();
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.open) {
      document.body.classList.add("no-overflow");
    }

    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    document.body.classList.remove("no-overflow");
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleBackdropClick() {
    if (this.props.closeByBackdropClick) {
      this.closeModal();
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }

  handleWindowResize() {
    // Return early if the modal is closed or not using Gemini.
    if (!this.props.open) {
      return;
    }

    const viewportHeight = Math.ceil(DOMUtil.getViewportHeight());

    // If the height of the viewport is getting shorter, or if it's growing
    // while the height is currently constrained, then we reset the restrained
    // height to null which will cause the height to be recalculated on the
    // next render.
    if (
      viewportHeight < this.lastViewportHeight ||
      (viewportHeight > this.lastViewportHeight && this.state.height !== null)
    ) {
      this.setState({ height: null });
    }

    this.lastViewportHeight = viewportHeight;
    window.requestAnimationFrame(this.calculateContentHeight);
  }

  addKeydownListener() {
    document.body.addEventListener("keydown", this.handleKeyDown);
  }

  removeKeydownListener() {
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }

  calculateContentHeight() {
    // A full screen modal doesn't need to restrict its height.
    if (this.props.isFullScreen) {
      return;
    }

    let headerHeight = 0;
    let footerHeight = 0;
    let modalHeight = 0;
    let innerContentHeight = 0;

    if (this.headerRef != null && this.headerRef.current != null) {
      headerHeight = Math.ceil(
        this.headerRef.current.getBoundingClientRect().height
      );
    }

    if (this.footerRef != null && this.footerRef.current != null) {
      footerHeight = Math.ceil(
        this.footerRef.current.getBoundingClientRect().height
      );
    }

    if (this.modalRef != null && this.modalRef.current != null) {
      modalHeight = Math.ceil(
        this.modalRef.current.getBoundingClientRect().height
      );
    }

    if (this.innerContentRef != null && this.innerContentRef.current != null) {
      innerContentHeight = Math.ceil(
        this.innerContentRef.current.getBoundingClientRect().height
      );
    }

    const maxModalHeight =
      this.lastViewportHeight - MODAL_VERTICAL_INSET_DISTANCE;

    const totalModalContentHeight =
      innerContentHeight + headerHeight + footerHeight;

    // When the modal's content fits on the screen, both the modal and body
    // height can be set to `auto` (default).
    let nextInnerContentContainerHeight = "auto";
    let nextModalHeight = "auto";

    // When the modal's content is too large to fit on the screen, then we need
    // to explicitly set the body's height to its exact pixel value and the
    // modal's height to `100%`.
    const shouldConstrainHeight =
      totalModalContentHeight >= maxModalHeight ||
      this.lastViewportHeight < this.lastConstrainedHeight;

    if (shouldConstrainHeight) {
      const availableContentHeight = modalHeight - headerHeight - footerHeight;
      nextInnerContentContainerHeight = `${availableContentHeight}px`;
      nextModalHeight = "100%";

      // We need to keep track of the largest viewport height that results in a
      // constrained modal.
      if (
        this.lastConstrainedHeight == null ||
        this.lastViewportHeight > this.lastConstrainedHeight
      ) {
        this.lastConstrainedHeight = this.lastViewportHeight;
      }

      if (
        this.props.useGemini &&
        this.state.height !== availableContentHeight
      ) {
        this.setState({ height: availableContentHeight });
      }
    }

    if (
      this.innerContentContainerRef != null &&
      this.innerContentContainerRef.current != null
    ) {
      this.innerContentContainerRef.current.style.height = nextInnerContentContainerHeight;
    }
    if (this.modalRef != null && this.modalRef.current != null) {
      this.modalRef.current.style.height = nextModalHeight;
    }

    this.triggerGeminiUpdate();
  }

  closeModal() {
    this.props.onClose();
  }

  getCloseButton() {
    if (this.props.closeButton) {
      return this.props.closeButton;
    }

    return null;
  }

  getHeader() {
    if (this.props.showHeader === false) {
      return null;
    }

    return (
      <div className={this.props.headerClass} ref={this.headerRef}>
        {this.props.header}
        {this.props.subHeader}
      </div>
    );
  }

  getFooter() {
    if (this.props.showFooter === false) {
      return null;
    }

    return (
      <div className={this.props.footerClass} ref={this.footerRef}>
        {this.props.footer}
      </div>
    );
  }

  getModalContent() {
    const modalContent = (
      <div
        className={this.props.scrollContainerClass}
        ref={this.innerContentRef}
      >
        {this.props.children}
      </div>
    );

    // If the consume disables gemini or we don't know the height, then we
    // don't render with Gemini, unless the consumer is using specifying a
    // custom height.
    if (
      (!this.props.useGemini || this.state.height == null) &&
      this.props.modalHeight == null
    ) {
      return modalContent;
    }

    const geminiClasses = classNames(
      "container-scrollable",
      this.props.geminiClass
    );
    const geminiContainerStyle = { height: this.state.height };

    if (this.props.modalHeight) {
      geminiContainerStyle.height = this.props.modalHeight;
    }

    return (
      <GeminiScrollbar
        autoshow={false}
        className={geminiClasses}
        ref={this.geminiRef}
        style={geminiContainerStyle}
      >
        {modalContent}
      </GeminiScrollbar>
    );
  }

  getModal() {
    const modalBodyStyle: any = {};

    if (!this.props.open) {
      return null;
    }

    if (this.state.height != null) {
      modalBodyStyle.height = this.state.height;
    }

    return (
      <div ref={this.modalRef} className={this.props.modalClass}>
        {this.getCloseButton()}
        {this.getHeader()}
        <div
          className={this.props.bodyClass}
          style={modalBodyStyle}
          ref={this.innerContentContainerRef}
        >
          {this.getModalContent()}
        </div>
        {this.getFooter()}
      </div>
    );
  }

  getBackdrop() {
    if (!this.props.open) {
      return null;
    }

    return (
      // tslint:disable react-a11y-event-has-role
      <div
        className={this.props.backdropClass}
        onClick={this.handleBackdropClick}
      />
      // tslint:enable
    );
  }

  triggerGeminiUpdate() {
    if (
      this.geminiRef != null &&
      this.geminiRef.current != null &&
      this.geminiRef.current.scrollbar != null
    ) {
      this.geminiRef.current.scrollbar.update();
    }
  }

  render() {
    let modalContent: any = null;

    if (this.props.open) {
      modalContent = (
        <div
          className={classNames("modal-wrapper", this.props.modalWrapperClass)}
        >
          {this.getBackdrop()}
          {this.getModal()}
        </div>
      );
    }

    return (
      <CSSTransition
        in={this.props.open}
        appear={this.props.transitionAppear}
        enter={this.props.transitionEnter}
        exit={this.props.transitionExit}
        classNames={this.props.transitionNameModal}
        timeout={{
          enter: this.props.transitionEnterTimeout,
          exit: this.props.transitionExitTimeout,
          appear: this.props.transitionAppearTimeoutModal
        }}
      >
        <div>{modalContent}</div>
      </CSSTransition>
    );
  }
}
