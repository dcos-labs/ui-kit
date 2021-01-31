import * as React from "react";
import { borderedListStyle } from "../style";
import { cx } from "@emotion/css";
import { SharedListProps } from "./List";
import { listReset } from "../../shared/styles/styleUtils";

const BorderedList: React.SFC<SharedListProps> = props => {
  const { tag, children } = props;
  const BorderedListEl = tag;

  return (
    <BorderedListEl
      className={cx(listReset, borderedListStyle)}
      data-cy="borderedList"
    >
      {children}
    </BorderedListEl>
  );
};

BorderedList.defaultProps = {
  tag: "ul"
};

export default BorderedList;
