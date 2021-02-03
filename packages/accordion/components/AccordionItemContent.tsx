import * as React from "react";
import { Context as AccordionItemContext } from "./AccordionItemContext";
import { cx } from "@emotion/css";
import {
  visuallyHidden,
  border,
  padding
} from "../../shared/styles/styleUtils";
import { getAllFocusableChildNodes } from "../../utilities/getFocusableChildNodes";
import { accordionItemContent } from "../style";
import { SpaceSize } from "../../shared/styles/styleUtils/modifiers/modifierUtils";

const AccordionItemContent: React.FC<{
  /**
   * human-readable selector used for writing tests
   */
  ["data-cy"]?: string;
  /**
   * the amount of space between the border and the content
   */
  paddingSize?: SpaceSize;
}> = ({ children, "data-cy": dataCy, paddingSize }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const accordionItemContext = React.useContext(AccordionItemContext);
  React.useEffect(() => {
    const allFocusable = contentRef.current
      ? getAllFocusableChildNodes(contentRef.current)
      : [];

    if (!accordionItemContext?.isExpanded) {
      allFocusable.forEach(el => {
        el.setAttribute("tabindex", "-1");
      });
      return;
    }

    allFocusable.forEach(el => {
      el.removeAttribute("tabindex");
    });
  }, [contentRef, accordionItemContext?.isExpanded]);

  return (
    <div
      aria-labelledby={accordionItemContext?.headingId}
      id={accordionItemContext?.contentId}
      className={cx(
        border("all"),
        padding("all", paddingSize),
        accordionItemContent,
        {
          [visuallyHidden]: !accordionItemContext?.isExpanded
        }
      )}
      ref={contentRef}
      hidden={!accordionItemContext?.isExpanded}
      data-cy={dataCy}
    >
      {children}
    </div>
  );
};

AccordionItemContent.defaultProps = {
  paddingSize: "m",
  "data-cy": "accordionItemContent"
};

export default AccordionItemContent;
