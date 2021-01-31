import * as React from "react";
import { cx } from "@emotion/css";
import { margin } from "../../shared/styles/styleUtils";
import { dlReset } from "../../shared/styles/styleUtils/resets/definitionListReset";

const ConfigurationMapSection = ({ children }) => (
  <div
    className={cx(dlReset, margin("bottom", "l"))}
    data-cy="configurationMapSection"
  >
    {children}
  </div>
);

export default ConfigurationMapSection;
