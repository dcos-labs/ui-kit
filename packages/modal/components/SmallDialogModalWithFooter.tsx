import * as React from "react";
import { jsx } from "@emotion/core";
import DialogModalWithFooter, {
  DialogModalWithFooterProps
} from "./DialogModalWithFooter";
import { ModalSizes } from "./ModalBase";

const SmallDialogModalWithFooter = (props: DialogModalWithFooterProps) => (
  <DialogModalWithFooter size={ModalSizes.S} {...props} />
);

export default SmallDialogModalWithFooter;
