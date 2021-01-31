import * as React from "react";
import { cx } from "@emotion/css";

import { Icon } from "../../icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import {
  textWeight,
  flex,
  padding,
  textSize
} from "../../shared/styles/styleUtils";

export interface BreadcrumbProps {
  children?: React.ReactNode | string;
}

function intersperse<A>(list: A[], sep: JSX.Element) {
  return Array.prototype.concat(...list.map(e => [sep, e])).slice(1);
}

class Breadcrumb extends React.PureComponent<BreadcrumbProps, {}> {
  public render() {
    const breadcrumbSeparator = (
      <Icon shape={SystemIcons.CaretRight} size="xs" />
    );
    const crumbsArr = intersperse(
      React.Children.toArray(this.props.children),
      breadcrumbSeparator
    );

    return (
      <nav className={cx(flex({ align: "center", wrap: "wrap" }))}>
        {crumbsArr.map((crumb, i) => (
          <div
            key={`breadcrumb-wrapper-${i}`}
            className={cx(textWeight("medium"), textSize("l"), {
              [padding("left", "xs")]: i !== 0
            })}
            data-cy="breadcrumb"
          >
            {crumb}
          </div>
        ))}
      </nav>
    );
  }
}

export default Breadcrumb;
