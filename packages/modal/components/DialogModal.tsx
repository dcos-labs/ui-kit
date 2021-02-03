import * as React from "react";
import { cx } from "@emotion/css";
import { modalCloseWrapper, modalContent, modalHeader } from "../style";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import {
  display,
  flex,
  flexItem,
  padding,
  textSize
} from "../../shared/styles/styleUtils";
import Clickable from "../../clickable/components/clickable";
import Icon from "../../icon/components/Icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";

export interface DialogModalProps extends ModalBaseProps {
  /** Content that gets anchored to the button of the footer. Currently, this is just primary and secondary actions. ⚠️Do not use this directly⚠️ */
  footerContent?: React.ReactNode;
  /** Whether we automatically add padding to the body of the modal. */
  isContentFlush?: boolean;
  /** The text displayed in the header of the modal. */
  title: React.ReactNode;
}

class DialogModal extends React.PureComponent<DialogModalProps, {}> {
  public render() {
    const {
      children,
      footerContent,
      isContentFlush,
      title,
      ...other
    } = this.props;

    return (
      <ModalBase data-cy="dialogModal" {...other}>
        <div
          className={cx(modalHeader, flexItem("shrink"))}
          data-cy="dialogModal-header"
        >
          <div className={cx(flex({ align: "center" }), padding("all", "l"))}>
            <div className={cx(flexItem("grow"), textSize("l"))}>{title}</div>
            <div
              className={cx(
                modalCloseWrapper,
                display("inherit"),
                flexItem("shrink")
              )}
            >
              <Clickable tabIndex={0} action={this.props.onClose}>
                <span className={display("inherit")}>
                  <Icon shape={SystemIcons.Close} size="xs" />
                </span>
              </Clickable>
            </div>
          </div>
        </div>
        <div
          className={cx(modalContent, {
            [padding("all", "l")]: !isContentFlush
          })}
          data-cy="dialogModal-content"
        >
          {children}
        </div>
        {footerContent && (
          <div
            className={cx(flexItem("shrink"), padding("all", "l"))}
            data-cy="dialogModal-footer"
          >
            {footerContent}
          </div>
        )}
      </ModalBase>
    );
  }
}

export default DialogModal;
