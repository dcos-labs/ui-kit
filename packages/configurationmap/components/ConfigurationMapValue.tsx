import * as React from "react";
import { cx } from "@emotion/css";
import { flexItem, breakWord } from "../../shared/styles/styleUtils";
import { ddReset } from "../../shared/styles/styleUtils/resets/definitionListReset";

const ConfigurationMapValue = ({ children }) => (
  <div
    className={cx(ddReset, flexItem("grow"), breakWord)}
    data-cy="configurationMapValue"
  >
    {children}
  </div>
);

export default ConfigurationMapValue;
