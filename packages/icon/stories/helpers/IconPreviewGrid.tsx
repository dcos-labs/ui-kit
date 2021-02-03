import * as React from "react";
import { css } from "@emotion/css";
import {
  greyDark,
  textColorSecondary,
  textColorSecondaryInverted
} from "../../../design-tokens/build/js/designTokens";

const iconGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-column-gap: 1em;
  grid-row-gap: 2em;
  padding: 2em 0;
  text-align: center;
`;

const IconGrid = props => {
  const { iconEnum, iconEnumTitle, darkMode } = props;

  return (
    <div style={{ backgroundColor: darkMode ? greyDark : "" }}>
      <div className={iconGrid}>
        {Object.keys(iconEnum).map(name => (
          <div>
            <svg
              preserveAspectRatio="xMinYMin meet"
              width={48}
              height={48}
              viewBox="0 0 48 48"
              key={name}
            >
              <use xlinkHref={`#${iconEnum[name]}`} />
            </svg>
            <p
              style={{
                color: darkMode
                  ? textColorSecondary
                  : textColorSecondaryInverted
              }}
            >{`${iconEnumTitle}.${name}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconGrid;
