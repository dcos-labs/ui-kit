import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import {
  DialogModal,
  SmallDialogModal,
  LargeDialogModal,
  DialogModalWithFooter,
  SmallDialogModalWithFooter,
  LargeDialogModalWithFooter,
  FullscreenModal
} from "../../index";
import ModalStoryContainer from "./helpers/ModalStoryContainer";
import { ModalContent, BorderedModalContent } from "./helpers/modalContents";
import PrimaryButton from "../../button/components/PrimaryButton";
import {
  flex,
  flexItem,
  padding,
  textSize,
  tintContentSecondary
} from "../../shared/styles/styleUtils";
import { SecondaryButton } from "../../button";
import { TextInput } from "../../textInput";
import { fullscreenModalTitle } from "../style";

const readme = require("../README.md");

storiesOf("Modal", module)
  .addDecorator(withReadme([readme]))
  .add(
    "DialogModal",
    withInfo({
      propTables: [DialogModal as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <DialogModal isOpen={isOpen} onClose={onClose} title="I am modal">
            <ModalContent />
          </DialogModal>
        )}
      </ModalStoryContainer>
    ))
  )
  .add(
    "SmallDialogModal",
    withInfo({
      propTables: [SmallDialogModal as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <SmallDialogModal
            isOpen={isOpen}
            onClose={onClose}
            title="I am modal"
          >
            <ModalContent />
          </SmallDialogModal>
        )}
      </ModalStoryContainer>
    ))
  )
  .add(
    "LargeDialogModal",
    withInfo({
      propTables: [LargeDialogModal as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <LargeDialogModal
            isOpen={isOpen}
            onClose={onClose}
            title="I am modal"
          >
            <ModalContent />
          </LargeDialogModal>
        )}
      </ModalStoryContainer>
    ))
  )
  .add(
    "DialogModal w/ flushed content",
    withInfo({
      propTables: [LargeDialogModal as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <DialogModal
            isOpen={isOpen}
            onClose={onClose}
            title="I am modal"
            isContentFlush={true}
          >
            <BorderedModalContent horizPadding="24px" />
          </DialogModal>
        )}
      </ModalStoryContainer>
    ))
  )
  .add(
    "DialogModalWithFooter",
    withInfo({
      propTables: [DialogModalWithFooter as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <DialogModalWithFooter
            isOpen={isOpen}
            onClose={onClose}
            title="I am modal"
            ctaButton={
              <PrimaryButton
                onClick={action("handling CTA")}
                aria-haspopup={true}
              >
                Continue
              </PrimaryButton>
            }
            closeText="Dismiss"
          >
            <ModalContent />
          </DialogModalWithFooter>
        )}
      </ModalStoryContainer>
    ))
  )
  .add(
    "SmallDialogModalWithFooter",
    withInfo({
      propTables: [SmallDialogModalWithFooter as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <SmallDialogModalWithFooter
            isOpen={isOpen}
            onClose={onClose}
            title="I am modal"
            ctaButton={
              <PrimaryButton
                onClick={action("handling CTA")}
                aria-haspopup={true}
              >
                Continue
              </PrimaryButton>
            }
            closeText="Dismiss"
          >
            <ModalContent />
          </SmallDialogModalWithFooter>
        )}
      </ModalStoryContainer>
    ))
  )
  .add(
    "LargeDialogModalWithFooter",
    withInfo({
      propTables: [LargeDialogModalWithFooter as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <LargeDialogModalWithFooter
            isOpen={isOpen}
            onClose={onClose}
            title="I am modal"
            ctaButton={
              <PrimaryButton
                onClick={action("handling CTA")}
                aria-haspopup={true}
              >
                Continue
              </PrimaryButton>
            }
            closeText="Dismiss"
          >
            <ModalContent />
          </LargeDialogModalWithFooter>
        )}
      </ModalStoryContainer>
    ))
  )
  .add(
    "FullscreenModal",
    withInfo({
      propTables: [FullscreenModal as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <FullscreenModal
            isOpen={isOpen}
            onClose={onClose}
            title="I am modal"
            subtitle="Optional subtitle"
            closeText="Dismiss"
            ctaButton={
              <PrimaryButton
                onClick={action("handling CTA")}
                aria-haspopup={true}
              >
                Continue
              </PrimaryButton>
            }
          >
            <ModalContent />
          </FullscreenModal>
        )}
      </ModalStoryContainer>
    ))
  )
  .add(
    "FullscreenModal with additional header content",
    withInfo({
      propTables: [FullscreenModal as any]
    })(() => {
      const HeaderContent = ({ ctaButton, closeText, title, onClose }) => (
        <div className={cx(flex({ align: "center" }), flexItem("shrink"))}>
          <div className={flexItem("grow")}>
            <SecondaryButton onClick={onClose}>{closeText}</SecondaryButton>
          </div>
          <div className={cx(fullscreenModalTitle, flexItem("grow"))}>
            <div className={textSize("l")}>{title}</div>
            <div className={cx(tintContentSecondary, textSize("s"))}>
              Some subheader
            </div>
          </div>
          <div className={flexItem("grow")}>
            <div className={cx(flex({ align: "center", justify: "flex-end" }))}>
              <div className={flexItem("shrink")}>
                <input type="checkbox" id="fauxToggle" />
                <label htmlFor="fauxToggle">Faux toggle</label>
              </div>
              <div className={cx(flexItem("shrink"), padding("left", "s"))}>
                {ctaButton}
              </div>
            </div>
          </div>
        </div>
      );
      return (
        <ModalStoryContainer>
          {({ isOpen, onClose }) => (
            <FullscreenModal
              isOpen={isOpen}
              onClose={onClose}
              title="I am modal"
              closeText="Dismiss"
              ctaButton={
                <PrimaryButton
                  onClick={action("handling CTA")}
                  aria-haspopup={true}
                >
                  Continue
                </PrimaryButton>
              }
              headerComponent={HeaderContent}
            >
              <ModalContent />
            </FullscreenModal>
          )}
        </ModalStoryContainer>
      );
    })
  )
  .add(
    "FullscreenModal w/ flushed content",
    withInfo({
      propTables: [FullscreenModal as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <FullscreenModal
            isOpen={isOpen}
            onClose={onClose}
            title="I am modal"
            closeText="Dismiss"
            isContentFlush={true}
            ctaButton={
              <PrimaryButton
                onClick={action("handling CTA")}
                aria-haspopup={true}
              >
                Continue
              </PrimaryButton>
            }
          >
            <BorderedModalContent horizPadding="32px" />
          </FullscreenModal>
        )}
      </ModalStoryContainer>
    ))
  )
  .add(
    "custom focused element",
    withInfo({
      propTables: [DialogModal as any]
    })(() => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <DialogModal
            isOpen={isOpen}
            onClose={onClose}
            title="I am modal"
            initialFocus="#focus-input"
          >
            <div>
              <ModalContent />
              <div className={padding("top", "m")}>
                <TextInput inputLabel="I get focus" id="focus-input" />
              </div>
            </div>
          </DialogModal>
        )}
      </ModalStoryContainer>
    ))
  );
