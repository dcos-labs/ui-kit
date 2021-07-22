import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";

import { Breadcrumb, BreadcrumbItem } from "../index";

import readme from "../README.md";
import { action } from "@storybook/addon-actions";
import { ProductIcons } from "../../icons/dist/product-icons-enum";

storiesOf("Navigation|Breadcrumb", module)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add("default", () => (
    <Breadcrumb>
      <span>One</span>
      <span>
        T<em>wo</em>
      </span>
    </Breadcrumb>
  ))
  .add("at top-level", () => (
    <Breadcrumb>
      <span>One</span>
    </Breadcrumb>
  ))
  .add("using BreadcrumbItems", () => (
    <Breadcrumb>
      <BreadcrumbItem>One</BreadcrumbItem>
      <BreadcrumbItem>Two</BreadcrumbItem>
      <BreadcrumbItem>
        <span style={{ color: "blue" }}>Three</span>
      </BreadcrumbItem>
    </Breadcrumb>
  ))
  .add("with click handler", () => (
    <Breadcrumb>
      <BreadcrumbItem onClick={action("clicked breadcrumb item one")}>
        One
      </BreadcrumbItem>
      <BreadcrumbItem onClick={action("clicked breadcrumb item two")}>
        Two
      </BreadcrumbItem>
    </Breadcrumb>
  ))
  .add("with icon", () => (
    <Breadcrumb>
      <BreadcrumbItem icon={ProductIcons.Gear}>One</BreadcrumbItem>
      <BreadcrumbItem>Two</BreadcrumbItem>
    </Breadcrumb>
  ));
