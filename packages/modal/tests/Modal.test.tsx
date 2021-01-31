import React from "react";
import { mount } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";
import ModalBase from "../components/ModalBase";
import DialogModalWithFooter from "../components/DialogModalWithFooter";
import FullscreenModal from "../components/FullscreenModal";
import { PrimaryButton } from "../../button";

expect.addSnapshotSerializer(serializer);

describe("Modal", () => {
  describe("ModalBase", () => {
    it("renders ModalBase", () => {
      const action = jest.fn();
      const component = mount(
        <ModalBase isOpen={true} onClose={action}>
          <div tabIndex={0}>I am modal content</div>
        </ModalBase>
      );
      expect(toJson(component)).toMatchSnapshot();
    });
    it("calls this.props.onClose when keying 'esc'", () => {
      const action = jest.fn();
      const component = mount(
        <ModalBase isOpen={true} onClose={action}>
          <div tabIndex={0}>I am modal content</div>
        </ModalBase>
      );

      expect(action).not.toHaveBeenCalled();
      component.find('[role="dialog"]').simulate("keyDown", {
        key: "Escape"
      });
      expect(action).toHaveBeenCalled();
    });
    it("calls this.props.onClose when clicking dark overlay", () => {
      const action = jest.fn();
      const component = mount(
        <ModalBase isOpen={true} onClose={action}>
          <div tabIndex={0}>I am modal content</div>
        </ModalBase>
      );

      expect(action).not.toHaveBeenCalled();
      component
        .find('[role="button"]')
        .first()
        .simulate("click");
      expect(action).toHaveBeenCalled();
    });
  });
  describe("DialogModal", () => {
    it("renders DialogModal", () => {
      const closeAction = jest.fn();
      const component = mount(
        <DialogModalWithFooter
          isOpen={true}
          onClose={closeAction}
          ctaButton={<PrimaryButton>CTA</PrimaryButton>}
          closeText="Close"
          title="Title"
        >
          <div tabIndex={0}>I am modal content</div>
        </DialogModalWithFooter>
      );
      expect(toJson(component)).toMatchSnapshot();
    });
    it("calls this.props.onClose when clicking the close button", () => {
      const closeAction = jest.fn();
      const component = mount(
        <DialogModalWithFooter
          isOpen={true}
          onClose={closeAction}
          ctaButton={<PrimaryButton>CTA</PrimaryButton>}
          closeText="Close"
          title="Title"
        >
          <div tabIndex={0}>I am modal content</div>
        </DialogModalWithFooter>
      );
      const closeButton = component.find("svg");
      expect(closeAction).not.toHaveBeenCalled();
      closeButton.simulate("click");
      expect(closeAction).toHaveBeenCalled();
    });
  });
  describe("FullscreenModal", () => {
    it("renders FullscreenModal", () => {
      const closeAction = jest.fn();
      const component = mount(
        <FullscreenModal
          isOpen={true}
          onClose={closeAction}
          ctaButton={<PrimaryButton>CTA</PrimaryButton>}
          closeText="Close"
          title="Title"
        >
          <div tabIndex={0}>I am modal content</div>
        </FullscreenModal>
      );
      expect(toJson(component)).toMatchSnapshot();
    });
    it("calls this.props.onClose when clicking the close button", () => {
      const closeAction = jest.fn();
      const component = mount(
        <DialogModalWithFooter
          isOpen={true}
          onClose={closeAction}
          ctaButton={<PrimaryButton>CTA</PrimaryButton>}
          closeText="Close"
          title="Title"
        >
          <div tabIndex={0}>I am modal content</div>
        </DialogModalWithFooter>
      );
      const closeButton = component.find("svg");
      expect(closeAction).not.toHaveBeenCalled();
      closeButton.simulate("click");
      expect(closeAction).toHaveBeenCalled();
    });
  });
});
