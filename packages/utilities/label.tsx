import * as React from "react";
import { cx } from "@emotion/css";
import { InputAppearance } from "../shared/types/inputAppearance";
import {
  tintText,
  visuallyHidden,
  flex,
  margin
} from "../shared/styles/styleUtils";
import { getLabelStyle } from "../shared/styles/formStyles";
import {
  themeError,
  greyLightDarken2
} from "../design-tokens/build/js/designTokens";
import Tooltip from "../tooltip/components/Tooltip";
import { Icon } from "../icon";
import { SystemIcons as SI } from "../icons/dist/system-icons-enum";

const trigger = (
  <Icon color={greyLightDarken2} shape={SI.CircleQuestion} size="xs" />
);
const reqStar = <span className={cx(tintText(themeError))}> *</span>;

export const renderLabel: React.FC<{
  appearance?: string;
  hidden?: boolean;
  id: string;
  label?: React.ReactNode;
  required?: boolean;
  tooltipContent?: React.ReactNode;
}> = ({ appearance, hidden, id, label, required, tooltipContent }) => {
  const hasError = appearance === InputAppearance.Error;
  const labelClassName = hidden ? cx(visuallyHidden) : getLabelStyle(hasError);
  const labelNode = (
    <label className={labelClassName} htmlFor={id} data-cy="textInput-label">
      {label}
      {required ? reqStar : null}
    </label>
  );
  if (!tooltipContent) {
    return labelNode;
  }
  return (
    <div className={flex()}>
      {labelNode}
      {tooltipContent ? (
        <span className={cx(margin("left", "xs"), margin("bottom", "xxs"))}>
          <Tooltip trigger={trigger} id={`labelTooltip-${id}`} maxWidth={200}>
            {tooltipContent}
          </Tooltip>
        </span>
      ) : null}
    </div>
  );
};
