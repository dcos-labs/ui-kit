import * as React from "react";
import { cx } from "@emotion/css";
import { configurationMapRow, showActionOnHoverStyle } from "../style";
import { flex, padding, border } from "../../shared/styles/styleUtils";

interface ConfigurationMapRowProps {
  children: React.ReactNode;
  onlyShowActionOnHover?: boolean;
}

const ConfigurationMapRow: React.FC<ConfigurationMapRowProps> = props => (
  <div
    className={cx(
      { [showActionOnHoverStyle]: props.onlyShowActionOnHover },
      configurationMapRow,
      border("bottom"),
      flex(),
      padding("vert", "xs")
    )}
    data-cy="configurationMapRow"
  >
    {props.children}
  </div>
);

export default ConfigurationMapRow;
