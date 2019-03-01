import * as React from "react";
import { jsx } from "@emotion/core";
import { flush } from "../../../shared/styles/styleUtils";

const borderedDivStyle = horizPadding => ({
  borderBottom: "1px solid gainsboro",
  padding: `24px ${horizPadding}`
});

export const ModalContent = () => (
  <p className={flush("all")}>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book. It has survived not only five centuries, but also
    the leap into electronic typesetting, remaining essentially unchanged. It
    was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum.
  </p>
);

export const BorderedModalContent = ({ horizPadding }) => (
  <div>
    <div style={borderedDivStyle(horizPadding)}>
      <p className={flush("all")}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>

    <div style={borderedDivStyle(horizPadding)}>
      <p className={flush("all")}>
        It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </div>
  </div>
);
