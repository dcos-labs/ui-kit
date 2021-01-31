import * as React from "react";
import { css } from "@emotion/css";

/* tslint:disable */
const productIconSprite = require("!svg-inline-loader!../packages/icons/dist/product-icons-sprite.svg");
const systemIconSprite = require("!svg-inline-loader!../packages/icons/dist/system-icons-sprite.svg");
/* tslint:enable */

const fauxDisplayNone = css`
  visibility: hidden;
  height: 0;
  width: 0;
  opacity: 0;
  overflow: hidden;
`;

export const iconDecorator = storyFn => (
  <div>
    <div
      className={fauxDisplayNone}
      dangerouslySetInnerHTML={{ __html: systemIconSprite }}
    />
    <div
      className={fauxDisplayNone}
      dangerouslySetInnerHTML={{ __html: productIconSprite }}
    />

    {storyFn()}
  </div>
);
