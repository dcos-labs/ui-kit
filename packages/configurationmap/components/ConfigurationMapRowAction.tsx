import * as React from "react";
import SecondaryButton from "../../button/components/SecondaryButton";
import { cx } from "@emotion/css";
import { flexItem } from "../../shared/styles/styleUtils";

interface ConfigurationMapRowActionProps {
  /**
   * What to render as the action content
   */
  children: React.ReactNode;
  /**
   * Click handler for the action
   */
  onClick: (event?: React.SyntheticEvent<HTMLElement>) => void;
}

export const rowActionStaticClassname = "static_configurationMapRowAction";

const ConfigurationMapRowAction: React.StatelessComponent<ConfigurationMapRowActionProps> = props => {
  const { onClick, children } = props;

  return (
    <span
      className={cx(rowActionStaticClassname, flexItem("shrink"))}
      data-cy="configrationMapRowAction"
    >
      <SecondaryButton onClick={onClick}>{children}</SecondaryButton>
    </span>
  );
};

export default ConfigurationMapRowAction;
