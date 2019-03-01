import * as React from "react";
import { jsx } from "@emotion/core";
import { cx } from "emotion";
import styled from "@emotion/styled";
import { sidebarSectionHeader, sidebarSectionList } from "../style";
import {
  tintText,
  textSize,
  textWeight,
  listReset,
  margin,
  flex
} from "../../shared/styles/styleUtils";
import { greyLightDarken3 } from "../../design-tokens/build/js/designTokens";
import { spaceSizes } from "../../../packages/shared/styles/styleUtils/modifiers/modifierUtils";

export interface SidebarSectionProps {
  children:
    | React.ReactElement<HTMLElement>
    | Array<React.ReactElement<HTMLElement>>;
  label?: React.ReactElement<HTMLElement> | string;
}

class SidebarSection extends React.PureComponent<SidebarSectionProps, {}> {
  public render() {
    const { label, children } = this.props;

    /* tslint:disable:no-string-literal */
    const H3 = styled("h3")`
      padding-left: ${props =>
        spaceSizes[props.theme.sidebarHeaderPaddingHor] || spaceSizes["l"]};
      padding-right: ${props =>
        spaceSizes[props.theme.sidebarHeaderPaddingHor] || spaceSizes["l"]};
      padding-bottom: ${props =>
        spaceSizes[props.theme.sidebarHeaderPaddingVert] || spaceSizes["s"]};
      padding-top: ${props =>
        spaceSizes[props.theme.sidebarHeaderPaddingVert] || spaceSizes["s"]};
    `;
    /* tslint:enable:no-string-literal */

    return (
      <div>
        {label && (
          <H3
            css={[
              sidebarSectionHeader,
              flex({ align: "center" }),
              tintText(greyLightDarken3),
              textSize("m"),
              textWeight("medium"),
              margin("bottom", "none"),
              margin("top", "none")
            ]}
          >
            {label}
          </H3>
        )}
        <ul css={[sidebarSectionList, listReset]}>{children}</ul>
      </div>
    );
  }
}

export default SidebarSection;
