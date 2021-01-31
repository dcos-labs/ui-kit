import * as React from "react";
import { cx } from "@emotion/css";
import { listReset } from "../../shared/styles/styleUtils";
import { listMarker } from "../style";

export interface SharedListProps {
  children:
    | Array<React.ReactElement<HTMLLIElement>>
    | React.ReactElement<HTMLLIElement>;
  tag: "ul" | "ol";
}

interface ListProps extends SharedListProps {
  /**
   * The style of the text bullets. See https://www.w3.org/TR/CSS21/generate.html#list-style for more info
   */
  markerStyle?:
    | "disc"
    | "circle"
    | "decimal"
    | "decimal-leading-zero"
    | "lower-roman"
    | "upper-roman"
    | "lower-latin"
    | "upper-latin"
    | "none";
}

const List = (props: ListProps) => {
  const { children, markerStyle, tag } = props;
  const ListEl = tag;

  return (
    <ListEl className={cx(listReset, listMarker(markerStyle))} data-cy="list">
      {children}
    </ListEl>
  );
};

List.defaultProps = {
  markerStyle: "none",
  tag: "ul"
};

export default List;
