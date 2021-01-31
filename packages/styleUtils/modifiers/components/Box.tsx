import * as React from "react";
import { css, cx } from "@emotion/css";
import { visuallyHidden } from "../../../shared/styles/styleUtils";

interface BgImageOptions {
  size?: React.CSSProperties["backgroundSize"];
  position?: React.CSSProperties["backgroundPosition"];
  repeat?: React.CSSProperties["backgroundRepeat"];
}

export interface BoxProps {
  /**
   * Applies a background color
   */
  bgColor?: React.CSSProperties["backgroundColor"];
  /**
   * Applies a background image
   */
  bgImageUrl?: string;
  /**
   * Options for how the background image should be displayed
   */
  bgImageOptions?: BgImageOptions;
  /**
   * Modifies the `display` property
   */
  display?: React.CSSProperties["display"];
  /**
   * Vertically aligns the direct children of the component
   */
  vertAlignChildren?: "top" | "bottom" | "center";
  /**
   * Hides the component and it's children visually, but still keeps them visual to screenreaders
   */
  isVisuallyHidden?: boolean;
  /**
   * Aligns text or inline and inline-block elements
   */
  textAlign?: React.CSSProperties["textAlign"];
  /**
   * Which HTML tag to render the component with
   */
  tag: keyof React.ReactHTML;
  /**
   * human-readable selector used for writing tests
   */
  ["data-cy"]?: string;
  children?: React.ReactNode;
  className?: string;
}

const Box = (props: BoxProps) => {
  const {
    bgColor,
    bgImageUrl,
    bgImageOptions,
    display,
    vertAlignChildren,
    isVisuallyHidden,
    textAlign,
    tag,
    className,
    "data-cy": dataCy,
    ...other
  } = props;
  const getBgImageOptionVal = (option: "size" | "position" | "repeat") =>
    bgImageOptions ? bgImageOptions[option] : null;
  const displayValue = vertAlignChildren ? "flex" : display;
  const vertAlignMap = {
    top: "flex-start",
    bottom: "flex-end",
    center: "center"
  };
  const getVertAlignChildrenStyles = vertAlignChildren =>
    vertAlignChildren
      ? `
        display: flex;
        flex-direction: column;
        justify-content: ${vertAlignMap[vertAlignChildren]};
      `
      : null;
  const BoxEl = tag;

  const boxStyles = css`
    background-color: ${bgColor};
    background-image: ${bgImageUrl ? `url(${bgImageUrl})` : null};
    background-position: ${getBgImageOptionVal("position")};
    background-repeat: ${getBgImageOptionVal("repeat") || "no-repeat"};
    background-size: ${getBgImageOptionVal("size")};
    display: ${displayValue};
    text-align: ${textAlign};
    ${isVisuallyHidden ? visuallyHidden : null};
    ${getVertAlignChildrenStyles(vertAlignChildren)};
  `;

  return (
    <BoxEl className={cx(boxStyles, className)} data-cy={dataCy} {...other} />
  );
};

Box.defaultProps = {
  bgImageOptions: { size: undefined, position: undefined, repeat: undefined },
  tag: "div" as keyof React.ReactHTML,
  "data-cy": "box"
};

export default Box;
