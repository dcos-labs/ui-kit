import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { withInfo } from "@storybook/addon-info";
import {
  PrimaryDropdownButton,
  SecondaryDropdownButton,
  StandardDropdownButton,
  SuccessDropdownButton,
  DangerDropdownButton
} from "../../index";
import ButtonAppearanceSample from "./helpers/ButtonAppearanceSample";
import { CloseIcon } from "../../shared/icons";

const readme = require("../README.md");

storiesOf("Buttons/Dropdown", module)
  .addDecorator(withReadme([readme]))

  .add(
    "PrimaryDropdownButton",
    withInfo({
      propTables: [PrimaryDropdownButton]
    })(() => <ButtonAppearanceSample buttonComponent={PrimaryDropdownButton} />)
  )
  .add(
    "SecondaryDropdownButton",
    withInfo({
      propTables: [SecondaryDropdownButton]
    })(() => (
      <ButtonAppearanceSample buttonComponent={SecondaryDropdownButton} />
    ))
  )
  .add(
    "StandardDropdownButton",
    withInfo({
      propTables: [StandardDropdownButton]
    })(() => (
      <ButtonAppearanceSample buttonComponent={StandardDropdownButton} />
    ))
  )
  .add(
    "SuccessDropdownButton",
    withInfo({
      propTables: [SuccessDropdownButton]
    })(() => <ButtonAppearanceSample buttonComponent={SuccessDropdownButton} />)
  )
  .add(
    "DangerDropdownButton",
    withInfo({
      propTables: [DangerDropdownButton]
    })(() => <ButtonAppearanceSample buttonComponent={DangerDropdownButton} />)
  )
  .add(
    "full-width dropdown",
    withInfo({
      propTables: [StandardDropdownButton]
    })(() => (
      <StandardDropdownButton isFullWidth={true}>
        Full-width
      </StandardDropdownButton>
    ))
  )
  .add(
    "full-width dropdown with icon",
    withInfo({
      propTables: [StandardDropdownButton]
    })(() => (
      <StandardDropdownButton iconStart={<CloseIcon />} isFullWidth={true}>
        Full-width
      </StandardDropdownButton>
    ))
  )
  .add(
    "dropdown with icon",
    withInfo({
      propTables: [StandardDropdownButton]
    })(() => (
      <StandardDropdownButton iconStart={<CloseIcon />}>
        Icon dropdown
      </StandardDropdownButton>
    ))
  )
  .add(
    "dropdown with only an icon",
    withInfo({
      propTables: [StandardDropdownButton]
    })(() => <StandardDropdownButton iconStart={<CloseIcon />} />)
  );
