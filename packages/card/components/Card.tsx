import * as React from "react";
import { cardBase } from "../style";
import { cx } from "@emotion/css";
import { preserveAspectRatio, padding } from "../../shared/styles/styleUtils";
import { SpaceSize } from "../../shared/styles/styleUtils/modifiers/modifierUtils";

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * `[width, height]` Keeps the card's width and height at a specific proportion. e.g.: 2:1 would be [2, 1]
   */
  aspectRatio?: [number, number];
  /**
   * The padding between the border and the content. Can be set for all viewport sizes, or configured to have different values at different viewport width breakpoints
   */
  paddingSize?: SpaceSize;
  children?: React.ReactNode | string;
}

class Card<P extends CardProps, S extends {}> extends React.PureComponent<
  P,
  S
> {
  public static defaultProps: Partial<CardProps> = {
    paddingSize: "m"
  };

  public render() {
    return this.getCardElement(this.props);
  }

  protected getCardElement(cardProps: CardProps, additionalClasses?: string) {
    const { children, aspectRatio, paddingSize, ...other } = cardProps;
    const aspectRatioStyle = aspectRatio
      ? preserveAspectRatio(aspectRatio[0], aspectRatio[1])
      : null;

    return (
      <div
        className={cx(cardBase, aspectRatioStyle, additionalClasses)}
        data-cy="card"
        {...other}
      >
        <div className={padding("all", paddingSize)}>{children}</div>
      </div>
    );
  }
}

export default Card;
