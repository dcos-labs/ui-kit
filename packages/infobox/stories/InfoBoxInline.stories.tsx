import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { InfoBoxInline } from "../index";
import { PrimaryAction, SecondaryAction } from "./helpers/actions";
import InfoBoxStoryContainer from "./helpers/InfoBoxStoryContainer";

const readme = require("../README.md");

storiesOf("InfoBox/Inline", module)
  .addDecorator(withReadme([readme]))
  .addWithInfo("default", () => (
    <InfoBoxStoryContainer>
      <div style={{ padding: "1rem 1rem 0 1rem" }}>
        <InfoBoxInline message="This is message is an example of how we might inform the user in DCOS" />
      </div>
    </InfoBoxStoryContainer>
  ))
  .addWithInfo("info", () => (
    <InfoBoxStoryContainer>
      <div style={{ padding: "1rem 1rem 0 1rem" }}>
        <InfoBoxInline
          appearance="info"
          message="This is message is an example of how we might inform the user in DCOS"
        />
      </div>
    </InfoBoxStoryContainer>
  ))
  .addWithInfo("success", () => (
    <InfoBoxStoryContainer>
      <div style={{ padding: "1rem 1rem 0 1rem" }}>
        <InfoBoxInline
          appearance="success"
          message="This is message is an example of how we might inform the user in DCOS"
        />
      </div>
    </InfoBoxStoryContainer>
  ))
  .addWithInfo("warning", () => (
    <InfoBoxStoryContainer>
      <div style={{ padding: "1rem 1rem 0 1rem" }}>
        <InfoBoxInline
          appearance="warning"
          message="This is message is an example of how we might inform the user in DCOS"
        />
      </div>
    </InfoBoxStoryContainer>
  ))
  .addWithInfo("danger", () => (
    <InfoBoxStoryContainer>
      <div style={{ padding: "1rem 1rem 0 1rem" }}>
        <InfoBoxInline
          appearance="danger"
          message="This is message is an example of how we might inform the user in DCOS"
        />
      </div>
    </InfoBoxStoryContainer>
  ))
  .addWithInfo("message as custom markup", () => (
    <InfoBoxStoryContainer>
      <div style={{ padding: "1rem 1rem 0 1rem" }}>
        <InfoBoxInline
          message={
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "normal",
                  margin: 0,
                  paddingBottom: ".5rem"
                }}
              >
                <span style={{ fontWeight: 600 }}>There is something</span> that
                we need to tell you about
              </h3>
              <p style={{ fontSize: ".8rem", margin: 0 }}>
                And that something is detailed enough to require two lines and
                some custom formatting
              </p>
            </div>
          }
        />
      </div>
    </InfoBoxStoryContainer>
  ))
  .addWithInfo("1 action", () => (
    <InfoBoxStoryContainer>
      <div style={{ padding: "1rem 1rem 0 1rem" }}>
        <InfoBoxInline
          message="This is message is an example of how we might inform the user in DCOS"
          primaryAction={<PrimaryAction />}
        />
      </div>
    </InfoBoxStoryContainer>
  ))
  .addWithInfo("2 actions", () => (
    <InfoBoxStoryContainer>
      <div style={{ padding: "1rem 1rem 0 1rem" }}>
        <InfoBoxInline
          message="This is message is an example of how we might inform the user in DCOS"
          primaryAction={<PrimaryAction />}
          secondaryAction={<SecondaryAction />}
        />
      </div>
    </InfoBoxStoryContainer>
  ));
