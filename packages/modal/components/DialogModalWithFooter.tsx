import * as React from "react";
import { jsx } from "@emotion/core";
import DialogModal, { DialogModalProps } from "./DialogModal";
import SecondaryButton from "../../button/components/SecondaryButton";
import { ButtonProps } from "../../button/components/ButtonBase";
import { flex, flexItem } from "../../shared/styles/styleUtils";

export interface DialogModalWithFooterProps extends DialogModalProps {
  /** The primary button */
  ctaButton: React.ReactElement<ButtonProps>;
  /** The text for the button that secondary button, which closes the modal */
  closeText: React.ReactNode;
}

class DialogModalWithFooter extends React.PureComponent<
  DialogModalWithFooterProps,
  {}
> {
  public render() {
    const { ctaButton, closeText, onClose, ...other } = this.props;

    return (
      <DialogModal
        footerContent={
          <div className={flex({ align: "center", justify: "space-between" })}>
            <div className={flexItem("shrink")}>
              <SecondaryButton onClick={onClose}>{closeText}</SecondaryButton>
            </div>
            <div className={flexItem("shrink")}>{ctaButton}</div>
          </div>
        }
        onClose={onClose}
        {...other}
      />
    );
  }
}

export default DialogModalWithFooter;
