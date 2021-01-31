import * as React from "react";
import { cx } from "@emotion/css";
import { fullscreenModalAction, fullscreenModalTitle } from "../style";
import {
  flex,
  flexItem,
  margin,
  padding,
  textSize,
  textWeight,
  tintContent
} from "../../shared/styles/styleUtils";
import { textColorSecondary } from "../../design-tokens/build/js/designTokens";
import { SecondaryButton } from "../../button";

const FullscreenModalHeader = ({
  title,
  subtitle,
  ctaButton,
  closeText,
  onClose
}) => (
  <div className={cx(flex({ align: "center" }), flexItem("shrink"))}>
    <div className={cx(fullscreenModalAction.dismiss, flexItem("grow"))}>
      <SecondaryButton onClick={onClose}>{closeText}</SecondaryButton>
    </div>
    <div className={flexItem("grow")}>
      <h2
        className={cx(
          fullscreenModalTitle,
          margin("vert", "none"),
          padding("bottom", "xs"),
          textSize("l"),
          textWeight("normal")
        )}
      >
        {title}
      </h2>
      <h3
        className={cx(
          fullscreenModalTitle,
          margin("vert", "none"),
          textSize("s"),
          textWeight("normal"),
          tintContent(textColorSecondary)
        )}
      >
        {subtitle}
      </h3>
    </div>
    <div className={cx(fullscreenModalAction.cta, flexItem("grow"))}>
      {ctaButton}
    </div>
  </div>
);

export default FullscreenModalHeader;
