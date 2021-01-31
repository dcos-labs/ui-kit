import { css, cx } from "@emotion/css";
import { border } from "../shared/styles/styleUtils";
import {
  SpaceSizes,
  spaceSizes
} from "../shared/styles/styleUtils/modifiers/modifierUtils";
import { atMediaUp } from "../shared/styles/breakpoints";
import {
  TabDirection,
  TabDirections,
  defaultTabDirection
} from "./components/Tabs";

const spacingSizeConfig: { [key: string]: SpaceSizes } = {
  inset: "l",
  tabPanel: "xl",
  tabList: "s",
  betweenTabs: "m",
  withinTab: "s"
};

const unsetHorizBorder = css`
  border-bottom: 0;
`;

const unsetVertBorder = css`
  border-right: 0;
`;

const unsetHorizSelectedUnderline = css`
  height: auto;
  left: auto;
`;

const unsetVertSelectedUnderline = css`
  top: auto;
  width: auto;
`;
const horizTabs = css`
  display: flex;
  flex-direction: column;

  .react-tabs__tab-list {
    ${unsetVertBorder};
    ${border("bottom")};
    padding: 0 ${spaceSizes[spacingSizeConfig.inset]};
  }

  .react-tabs__tab {
    display: inline-block;
    padding: ${spaceSizes[spacingSizeConfig.withinTab]} 0;
    margin: 0 ${spaceSizes[spacingSizeConfig.betweenTabs]} 0 0;

    &:after {
      ${unsetVertSelectedUnderline};
      height: 2px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  .react-tabs__tab-panel {
    margin: ${spaceSizes[spacingSizeConfig.tabPanel]}
      ${spaceSizes[spacingSizeConfig.inset]};
  }
`;

const vertTabs = css`
  display: flex;
  flex-direction: row;

  .react-tabs__tab-list {
    ${unsetHorizBorder};
    ${border("right")};
    padding: ${spaceSizes[spacingSizeConfig.inset]} 0;
  }

  .react-tabs__tab {
    display: block;
    padding: 0 ${spaceSizes[spacingSizeConfig.withinTab]};
    margin: 0 0 ${spaceSizes[spacingSizeConfig.betweenTabs]} 0;

    &:after {
      ${unsetHorizSelectedUnderline};
      width: 2px;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }

  .react-tabs__tab-panel {
    margin: ${spaceSizes[spacingSizeConfig.inset]}
      ${spaceSizes[spacingSizeConfig.tabPanel]};
  }
`;

export const fullHeightTabs = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const getTabLayout = (direction: TabDirection): string => {
  const getHorizOrVertStyle = (direction: TabDirections) =>
    direction === "vert" ? vertTabs : horizTabs;

  return typeof direction === "object"
    ? cx(
        Object.keys({ default: defaultTabDirection, ...direction }).reduce(
          (acc, breakpoint) => {
            acc.push(
              css`
                ${atMediaUp[breakpoint](css`
                  ${getHorizOrVertStyle(direction[breakpoint])};
                `)};
              `
            );

            return acc;
          },
          Array()
        )
      )
    : getHorizOrVertStyle(direction);
};
