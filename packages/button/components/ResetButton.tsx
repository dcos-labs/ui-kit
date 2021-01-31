import * as React from "react";
import { cx } from "@emotion/css";
import { buttonReset } from "../../shared/styles/styleUtils";
import { keyboardFocus, pointerCursor } from "../style";

const ResetButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, className, disabled, type = "button", ...other } = props;
  const classNames = cx(buttonReset, className, keyboardFocus, {
    [pointerCursor]: !disabled
  });

  return (
    <button disabled={disabled} className={classNames} type={type} {...other}>
      <div tabIndex={-1}>{children}</div>
    </button>
  );
};

export default ResetButton;
