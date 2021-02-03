import * as React from "react";
import { cx } from "@emotion/css";
import { breakWord, textWeight, padding } from "../../shared/styles/styleUtils";
import { configurationMapLabel } from "../style";

const ConfigurationMapLabel: React.FC = ({ children }) => (
  <div
    className={cx(
      configurationMapLabel,
      padding("right", "s"),
      textWeight("medium"),
      breakWord
    )}
    data-cy="configurationMapLabel"
  >
    {children}
  </div>
);

export default ConfigurationMapLabel;
