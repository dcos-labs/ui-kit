import React from "react";
import { cx } from "@emotion/css";
import { modalWrapper } from "../style";
import { flex } from "../../shared/styles/styleUtils";
export interface ModalContentsProps {
  isOpen: boolean;
  onClose: () => void;
  ["data-cy"]?: string;
}

const ModalContents: React.FC<ModalContentsProps> = ({
  children,
  "data-cy": dataCy
}) => (
  <div
    className={cx(modalWrapper, flex({ direction: "column" }))}
    data-cy={dataCy}
  >
    {children}
  </div>
);

export default ModalContents;
