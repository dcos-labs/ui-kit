import * as React from "react";
import { jsx } from "@emotion/core";
import { InfoBoxProps } from "../../components/InfoBox";

class InfoBoxStoryContainer extends React.Component<
  { children: React.ReactElement<InfoBoxProps> },
  {}
> {
  render() {
    return (
      <div style={{ border: "1px solid #ccc" }}>
        {this.props.children}
        <div
          style={{ maxWidth: "500px", margin: "0 auto", padding: "1.5rem 0" }}
        >
          <p>This is just some sample page content, you can ignore it.</p>
        </div>
      </div>
    );
  }
}

export default InfoBoxStoryContainer;
