import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import FullscreenView from "../components/FullscrenView";
import {
  flex,
  flexItem,
  textSize,
  tintContentSecondary,
  padding
} from "../../shared/styles/styleUtils";
import { cx } from "@emotion/css";
import { fullscreenModalTitle } from "../style";
import { SecondaryButton, PrimaryButton } from "../../button";
import { action } from "@storybook/addon-actions";
import {
  ModalContent,
  BorderedModalContent
} from "../../modal/stories/helpers/modalContents";

const onClose = () => {
  alert("calling onClose");
};

import readme from "../README.md";

storiesOf("Page structure|FullscreenView", module)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add("default", () => (
    <div style={{ height: "500px" }}>
      <FullscreenView closeText="Close" title="Title" onClose={onClose}>
        <ModalContent />
      </FullscreenView>
    </div>
  ))
  .add("with additional header content", () => {
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
      <div style={{ height: "500px" }}>
        <FullscreenView
          onClose={onClose}
          title="Title"
          closeText="Close"
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
        </FullscreenView>
      </div>
    );
  })
  .add("with flushed content", () => (
    <div style={{ height: "500px" }}>
      <FullscreenView
        onClose={onClose}
        title="Title"
        closeText="Close"
        isContentFlush={true}
        ctaButton={
          <PrimaryButton onClick={action("handling CTA")} aria-haspopup={true}>
            Continue
          </PrimaryButton>
        }
      >
        <BorderedModalContent horizPadding="32px" />
      </FullscreenView>
    </div>
  ))
  .add("scrolling body", () => (
    <div style={{ height: "500px" }}>
      <FullscreenView closeText="Close" title="Title" onClose={onClose}>
        <BorderedModalContent horizPadding="32px" />
        <BorderedModalContent horizPadding="32px" />
        <BorderedModalContent horizPadding="32px" />
      </FullscreenView>
    </div>
  ));
