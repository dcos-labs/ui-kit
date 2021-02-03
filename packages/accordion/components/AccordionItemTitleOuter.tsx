import * as React from "react";
import { cx } from "@emotion/css";
import { border } from "../../shared/styles/styleUtils";
import { AccordionTitleAppearances } from "../types";
import {
  accordionTitle,
  accordionTitleDanger,
  accordionTitleExpanded,
  accordionTitleDisabled
} from "../style";

interface AccordionItemTitleOuterProps {
  appearance?: AccordionTitleAppearances;
  disabled?: boolean;
  isExpanded?: boolean;
  ["data-cy"]?: string;
}

const AccordionItemTitleOuter: React.FC<AccordionItemTitleOuterProps> = ({
  appearance,
  children,
  "data-cy": dataCy,
  disabled,
  isExpanded
}) => (
  <div
    className={cx(border("all"), accordionTitle, {
      [accordionTitleDanger]: appearance === "danger",
      [accordionTitleExpanded]: isExpanded,
      [accordionTitleDisabled]: disabled
    })}
    data-cy={dataCy}
  >
    {children}
  </div>
);

export default AccordionItemTitleOuter;
