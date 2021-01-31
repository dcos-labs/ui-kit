import * as React from "react";
import { cx } from "@emotion/css";
import ResetButton from "../../button/components/ResetButton";
import { Context as AccordionItemContext } from "./AccordionItemContext";
import { Context as AccordionContext } from "./AccordionContext";
import { textWeight } from "../../shared/styles/styleUtils";
import { fillWidth } from "../style";
import { HeadingLevel, AccordionTitleAppearances } from "../types";
import { headingReset } from "../../shared/styles/styleUtils/resets/headingReset";
import AccordionItemTitleOuter from "./AccordionItemTitleOuter";
import AccordionItemTitleInner from "./AccordionItemTitleInner";

export interface AccordionItemTitleProps {
  /**
   * Changes visual design attributes to communicate the status of the accordion item
   */
  appearance?: AccordionTitleAppearances;
  /**
   * human-readable selector used for writing tests
   */
  ["data-cy"]?: string;
  /**
   * Whether the accordion item can be expanded
   */
  disabled?: boolean;
  /**
   * Priority of the heading. Numbers map to <h1> through <h6>
   */
  headingLevel?: HeadingLevel;
}

const AccordionItemTitle: React.FC<AccordionItemTitleProps> = ({
  appearance,
  children,
  "data-cy": dataCy,
  disabled,
  headingLevel
}) => {
  const HeadingTag: keyof React.ReactHTML = `h${headingLevel}` as
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  const accordionItemContext = React.useContext(AccordionItemContext);
  const accordionContext = React.useContext(AccordionContext);
  const handleToggle = () => {
    if (accordionContext !== null) {
      accordionContext.setExpandedItems(
        accordionItemContext!.baseId,
        accordionItemContext!.isExpanded
      );
    }
  };

  return (
    <AccordionItemTitleOuter
      appearance={appearance}
      data-cy={[
        dataCy,
        ...(appearance && appearance !== "default"
          ? [`${dataCy}.${appearance}`]
          : []),
        ...(disabled ? [`${dataCy}.disabled`] : [])
      ].join(" ")}
      isExpanded={accordionItemContext!.isExpanded}
      disabled={disabled}
    >
      <HeadingTag
        id={accordionItemContext?.headingId || ""}
        className={cx(headingReset, textWeight("medium"))}
        data-cy={`${dataCy}-heading`}
      >
        <ResetButton
          disabled={disabled}
          aria-controls={accordionItemContext?.contentId || ""}
          aria-expanded="false"
          onClick={handleToggle}
          className={fillWidth}
          data-cy={`${dataCy}-button`}
        >
          <AccordionItemTitleInner
            isExpanded={accordionItemContext?.isExpanded}
          >
            {children}
          </AccordionItemTitleInner>
        </ResetButton>
      </HeadingTag>
    </AccordionItemTitleOuter>
  );
};

AccordionItemTitle.defaultProps = {
  headingLevel: 3,
  "data-cy": "accordionItemTitle"
};

export default AccordionItemTitle;
