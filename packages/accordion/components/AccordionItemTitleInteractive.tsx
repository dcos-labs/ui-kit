import * as React from "react";
import { cx } from "@emotion/css";
import { textWeight } from "../../shared/styles/styleUtils";
import { headingReset } from "../../shared/styles/styleUtils/resets/headingReset";
import ResetButton from "../../button/components/ResetButton";
import { Context as AccordionItemContext } from "./AccordionItemContext";
import { Context as AccordionContext } from "./AccordionContext";
import { AccordionItemTitleProps } from "./AccordionItemTitle";
import AccordionItemTitleOuter from "./AccordionItemTitleOuter";
import AccordionItemTitleInner from "./AccordionItemTitleInner";
import { fillWidth, accordionButtonOverlay } from "../style";

type ToggleButtonProps = Pick<
  React.HTMLAttributes<HTMLButtonElement>,
  "aria-controls" | "aria-expanded" | "onClick"
>;

interface RenderProps {
  headingId: string;
  toggleButtonProps: ToggleButtonProps;
  getHeading: (label: string) => React.ReactNode;
}

const AccordionItemTitleInteractive: React.FC<Exclude<
  AccordionItemTitleProps,
  "children"
> & {
  children: (renderProps: RenderProps) => React.ReactNode;
}> = ({ appearance, children, "data-cy": dataCy, disabled, headingLevel }) => {
  const HeadingTag: keyof React.ReactHTML = `h${headingLevel}` as
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  const accordionItemContext = React.useContext(AccordionItemContext);
  const accordionContext = React.useContext(AccordionContext);
  const handleToggle = () => {
    accordionContext?.setExpandedItems(
      accordionItemContext?.baseId || "",
      accordionItemContext?.isExpanded
    );
  };
  const toggleButtonProps = {
    ["aria-controls"]: accordionItemContext?.contentId,
    ["aria-expanded"]: accordionItemContext?.isExpanded,
    disabled,
    onClick: handleToggle
  };
  const getHeading = (label: string) => (
    <HeadingTag
      id={accordionItemContext?.headingId}
      className={cx(headingReset, textWeight("medium"))}
      data-cy={`${dataCy}-heading`}
    >
      {label}
    </HeadingTag>
  );

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
      isExpanded={accordionItemContext?.isExpanded}
      disabled={disabled}
    >
      <ResetButton
        disabled={disabled}
        aria-controls={accordionItemContext?.contentId}
        aria-expanded={accordionItemContext?.isExpanded}
        onClick={handleToggle}
        className={cx(accordionButtonOverlay, fillWidth)}
        data-cy={`${dataCy}-button`}
      />
      <AccordionItemTitleInner
        isExpanded={accordionItemContext?.isExpanded}
        isInteractive={true}
      >
        {children({
          getHeading,
          headingId: accordionItemContext?.headingId || "",
          toggleButtonProps
        })}
      </AccordionItemTitleInner>
    </AccordionItemTitleOuter>
  );
};

AccordionItemTitleInteractive.defaultProps = {
  headingLevel: 3,
  "data-cy": "accordionItemTitle"
};

export default AccordionItemTitleInteractive;
