import * as React from "react";
import { cx } from "@emotion/css";
import { flex } from "../../shared/styles/styleUtils";
import { useTheme } from "@emotion/react";
import { headerBar } from "../style";
import { AppChromeTheme } from "../types";

const Header: React.FC = ({ children }) => {
  const theme = useTheme() as AppChromeTheme;
  return (
    <div className={cx(headerBar(theme), flex({ align: "center" }))}>
      {children}
    </div>
  );
};

export default Header;
