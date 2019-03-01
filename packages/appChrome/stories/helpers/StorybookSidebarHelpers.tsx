import * as React from "react";
import { jsx } from "@emotion/core";
import { action } from "@storybook/addon-actions";
import {
  SidebarSection,
  SidebarItem,
  SidebarItemLabel,
  SidebarSubMenu,
  SidebarSubMenuItem
} from "../../index";
import { padding } from "../../../shared/styles/styleUtils";

export const PlaceholderIcon = props => (
  <svg
    width={props.width || "24"}
    height={props.width || "24"}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
        <stop stop-color="#FFF" stop-opacity=".4" offset="0%" />
        <stop stop-color="#FFF" stop-opacity=".6" offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
        <stop stop-color="#FFF" offset="0%" />
        <stop stop-color="#FFF" stop-opacity=".8" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <path
        d="M22 5.057v14.952c0 1.1-.898 1.991-1.99 1.991H3.99C2.892 22 2 21.102 2 20.01V9.7c3.454 1.222 2.523 6.808 6.554 6.808C13.081 16.508 14.38 5 21.063 5c.326 0 .638.02.937.057z"
        fill="url(#a)"
      />
      <path
        d="M22 5.057V3.99C22 2.898 21.109 2 20.01 2H3.99C2.899 2 2 2.891 2 3.99V9.7c3.454 1.222 2.523 6.808 6.554 6.808C13.081 16.508 14.38 5 21.063 5c.326 0 .638.02.937.057z"
        fill="url(#b)"
      />
    </g>
  </svg>
);

const alignToLogoStyles = {
  outer: { marginLeft: "-7px", marginRight: "-7px" },
  inner: { marginLeft: "-4px" }
};

export const SidebarContent = ({ sidebarData }) =>
  sidebarData.map(section => (
    <SidebarSection
      label={
        section.sectionLabel ? (
          <div style={alignToLogoStyles.outer}>{section.sectionLabel}</div>
        ) : (
          ""
        )
      }
    >
      {section.items.map(
        item =>
          item.subItems ? (
            <SidebarSubMenu
              iconWidth="24px"
              label={
                <div style={alignToLogoStyles.outer}>
                  <SidebarItemLabel icon={<PlaceholderIcon />}>
                    <div>{item.label}</div>
                  </SidebarItemLabel>
                </div>
              }
              menuHasIcon={true}
            >
              {item.subItems.map(subItem => (
                <SidebarSubMenuItem onClick={action(`go to ${subItem.label}`)}>
                  <div style={alignToLogoStyles.outer}>{subItem.label}</div>
                </SidebarSubMenuItem>
              ))}
            </SidebarSubMenu>
          ) : (
            <SidebarItem onClick={action(`go to ${item.label}`)}>
              <div style={alignToLogoStyles.outer}>
                <SidebarItemLabel icon={<PlaceholderIcon />}>
                  <div>{item.label}</div>
                </SidebarItemLabel>
              </div>
            </SidebarItem>
          )
      )}
    </SidebarSection>
  ));

export const SidebarBareContent = () => (
  <div css={padding("all", "l")}>
    <p style={{ marginTop: 0, fontSize: "1.125em", fontWeight: 500 }}>
      Content goes here
    </p>
    <ul>
      <li css={padding("bottom")}>Lorem Ipsum</li>
      <li css={padding("bottom")}>Dolor Sit</li>
      <li css={padding("bottom")}>Amet Consecutor</li>
      <li css={padding("bottom")}>Adipiscing Elit</li>
      <li css={padding("bottom")}>Praesent Massa</li>
    </ul>
  </div>
);
