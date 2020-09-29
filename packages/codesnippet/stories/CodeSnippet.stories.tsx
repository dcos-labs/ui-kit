import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { CodeSnippet } from "../index";

const readme = require("../README.md");

const snippetContent = `cd ui-kit && npm start`;

storiesOf("Typography|Containers/CodeSnippet", module)
  .addDecorator(withReadme([readme]))
  .add("default", () => <CodeSnippet>{snippetContent}</CodeSnippet>)
  .add("w/ textToCopy", () => (
    <CodeSnippet textToCopy={snippetContent}>{snippetContent}</CodeSnippet>
  ))
  .add("w/ textToCopy + onCopy callback", () => {
    const onCopyFn = () => {
      alert("oncopy");
    };
    return (
      <CodeSnippet textToCopy={snippetContent} onCopy={onCopyFn}>
        {snippetContent}
      </CodeSnippet>
    );
  })
  .add("w/ textToCopy + custom tooltip content on copy", () => (
    <CodeSnippet
      textToCopy={snippetContent}
      copyTooltipContent={`"${snippetContent}" copied`}
    >
      {snippetContent}
    </CodeSnippet>
  ));
