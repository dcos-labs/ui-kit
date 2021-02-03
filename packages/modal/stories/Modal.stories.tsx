import * as React from "react";
import { cx } from "@emotion/css";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { action } from "@storybook/addon-actions";
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
import { fullscreenModalTitle } from "../../fullscreenView/style";

import readme from "../README.md";

storiesOf("Overlays|Modal", module)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .addParameters({
    info: {
      propTablesExclude: [ModalStoryContainer]
    }
  })
  .add(
    "DialogModal",
    () => (
      <ModalStoryContainer>
        {({ isOpen, onClose }) => (
          <DialogModal isOpen={isOpen} onClose={onClose} title="I am modal">
            <ModalContent />
          </DialogModal>
        )}
      </ModalStoryContainer>
    ),
    {
      info: {
        propTables: [DialogModal]
      }
    }
  )
  .add(
    "SmallDialogModal",
    () => (
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
    ),
    {
      info: {
        propTables: [SmallDialogModal]
      }
    }
  )
  .add(
    "LargeDialogModal",
    () => (
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
    ),
    {
      info: {
        propTables: [LargeDialogModal]
      }
    }
  )
  .add(
    "DialogModal w/ flushed content",
    () => (
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
    ),
    {
      info: {
        propTables: [LargeDialogModal]
      }
    }
  )
  .add(
    "DialogModalWithFooter",
    () => (
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
    ),
    {
      info: {
        propTables: [DialogModalWithFooter]
      }
    }
  )
  .add(
    "SmallDialogModalWithFooter",
    () => (
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
    ),
    {
      info: {
        propTables: [SmallDialogModalWithFooter]
      }
    }
  )
  .add(
    "LargeDialogModalWithFooter",
    () => (
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
    ),
    {
      info: {
        propTables: [LargeDialogModalWithFooter]
      }
    }
  )
  .add(
    "FullscreenModal",
    () => (
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
    ),
    {
      info: {
        propTables: [FullscreenModal]
      }
    }
  )
  .add(
    "FullscreenModal with additional header content",
    () => {
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
    },
    {
      info: {
        propTables: [FullscreenModal]
      }
    }
  )
  .add(
    "FullscreenModal w/ flushed content",
    () => (
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
    ),
    {
      info: {
        propTables: [FullscreenModal]
      }
    }
  )
  .add(
    "FullscreenModal w/ dialog modal",
    () => {
      return (
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
              id="testId"
            >
              <ModalStoryContainer>
                {({ isOpen, onClose }) => (
                  <DialogModal
                    isOpen={isOpen}
                    onClose={onClose}
                    title="I am modal"
                    overlayRoot={document.querySelector("#testId")}
                  >
                    <ModalContent />
                  </DialogModal>
                )}
              </ModalStoryContainer>
            </FullscreenModal>
          )}
        </ModalStoryContainer>
      );
    },
    {
      info: {
        propTables: [FullscreenModal]
      }
    }
  )
  .add(
    "custom focused element",
    () => (
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
    ),
    {
      info: {
        propTables: [DialogModal]
      }
    }
  );
