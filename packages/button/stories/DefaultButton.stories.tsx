import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { withInfo } from "@storybook/addon-info";
import {
  PrimaryButton,
  SecondaryButton,
  StandardButton,
  SuccessButton,
  DangerButton
} from "../../index";
import ButtonAppearanceSample from "./helpers/ButtonAppearanceSample";
import { CloseIcon } from "../../shared/icons";
import { action } from "@storybook/addon-actions";

const readme = require("../README.md");

storiesOf("Buttons/Default", module)
  .addDecorator(withReadme([readme]))
  .add(
    "PrimaryButton",
    withInfo({
      propTables: [PrimaryButton]
    })(() => <ButtonAppearanceSample buttonComponent={PrimaryButton} />)
  )
  .add(
    "SecondaryButton",
    withInfo({ propTables: [SecondaryButton] })(() => (
      <ButtonAppearanceSample buttonComponent={SecondaryButton} />
    ))
  )
  .add(
    "StandardButton",
    withInfo({ propTables: [StandardButton] })(() => (
      <ButtonAppearanceSample buttonComponent={StandardButton} />
    ))
  )
  .add(
    "SuccessButton",
    withInfo({ propTables: [SuccessButton] })(() => (
      <ButtonAppearanceSample buttonComponent={SuccessButton} />
    ))
  )
  .add(
    "DangerButton",
    withInfo({ propTables: [DangerButton] })(() => (
      <ButtonAppearanceSample buttonComponent={DangerButton} />
    ))
  )
  .add(
    "with icon",
    withInfo({ propTables: [StandardButton] })(() => (
      <StandardButton iconStart={<CloseIcon />}>Icon button</StandardButton>
    ))
  )
  .add(
    "only an icon",
    withInfo({ propTables: [StandardButton] })(() => (
      <StandardButton iconStart={<CloseIcon />} />
    ))
  )
  .add(
    "full-width",
    withInfo({ propTables: [StandardButton] })(() => (
      <StandardButton isFullWidth={true}>Full-width</StandardButton>
    ))
  )
  .add(
    "full-width with icon",
    withInfo({ propTables: [StandardButton] })(() => (
      <StandardButton isFullWidth={true} iconStart={<CloseIcon />}>
        Full-width
      </StandardButton>
    ))
  )
  .add(
    "with onClick",
    withInfo({ propTables: [StandardButton] })(() => (
      <StandardButton onClick={action("Button pressed")}>
        Click me
      </StandardButton>
    ))
  );
