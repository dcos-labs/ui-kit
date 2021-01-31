import * as React from "react";
import { InfoBoxInline } from "../../../infobox";
import {
  Table_Deprecated,
  Column,
  HeaderCell,
  TextCell,
  NumberCell
} from "../../../table_deprecated";
import { items, width } from "../../../table_deprecated/stories/helpers/mocks";
import { css } from "@emotion/css";
import { TextInput } from "../../../textInput";
import { InputAppearance } from "../../../shared/types/inputAppearance";
import { PrimaryButton, DangerButton, SuccessButton } from "../../../button";
import {
  themeBgPrimary,
  themeTextColorPrimary
} from "../../../design-tokens/build/js/designTokens";

const nameCellRenderer = ({ name }: { name?: string }) => (
  <TextCell>
    <strong>{name}</strong>
  </TextCell>
);
const cityCellRenderer = ({ city }: { city?: string }) => (
  <TextCell>
    <strong>{city}</strong>
  </TextCell>
);
const roleCellRenderer = ({ role }: { role?: string }) => (
  <TextCell>
    <span>{role}</span>
  </TextCell>
);
const stateCellRenderer = ({ state }: { state?: string }) => (
  <TextCell>
    <span>{state}</span>
  </TextCell>
);
const zipcodeCellRenderer = ({ zipcode }: { zipcode?: string }) => (
  <NumberCell>
    <span>{zipcode}</span>
  </NumberCell>
);

const inputGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 1em;
  grid-row-gap: 2em;
  padding: 2em 0;

  & > div > * {
    margin-bottom: 1em;
  }
`;

const textWrapper = css`
  max-width: 70ch;
  p {
    margin-bottom: 1em;
  }
`;

const wrapper = css`
  background-color: ${themeBgPrimary};
  color: ${themeTextColorPrimary};
  padding: 1em;
`;

const StyleTile = () => (
  <div className={wrapper}>
    <InfoBoxInline
      appearance="success"
      message="Success! This UI can be themed by changing the object in the UIKitThemeProvider default story"
    />
    <h2>Theme Playground</h2>
    <div className={textWrapper}>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>

    <div className={inputGrid}>
      <div>
        <TextInput
          id="standard.input"
          inputLabel="Standard"
          placeholder="Placeholder"
          hintContent="This is a hint"
          tooltipContent="Here's a Tooltip. Tooltips are in the inverted context"
        />
        <PrimaryButton isFullWidth={true}>Primary button</PrimaryButton>
      </div>
      <div>
        <TextInput
          id="error.input"
          inputLabel="Error"
          appearance={InputAppearance.Error}
          placeholder="Placeholder"
          errors={["Please enter a value."]}
        />
        <DangerButton isFullWidth={true}>Danger button</DangerButton>
      </div>
      <div>
        <TextInput
          id="success.input"
          inputLabel="Success"
          appearance={InputAppearance.Success}
          placeholder="Placeholder"
          hintContent="This is a hint"
        />
        <SuccessButton isFullWidth={true}>Success button</SuccessButton>
      </div>
      <div>
        <TextInput
          id="disabled.input"
          inputLabel="Disabled"
          disabled={true}
          placeholder="Placeholder"
          hintContent="This is a hint"
        />
        <PrimaryButton isFullWidth={true} disabled={true}>
          Disabled button
        </PrimaryButton>
      </div>
    </div>

    <div style={{ height: "300px" }}>
      <Table_Deprecated data={items}>
        <Column
          header={<HeaderCell>name</HeaderCell>}
          cellRenderer={nameCellRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell>role</HeaderCell>}
          cellRenderer={roleCellRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell>state</HeaderCell>}
          cellRenderer={stateCellRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell textAlign="right">zip code</HeaderCell>}
          cellRenderer={zipcodeCellRenderer}
          width={width}
        />
        <Column
          header={<HeaderCell>city</HeaderCell>}
          cellRenderer={cityCellRenderer}
          width={width}
        />
      </Table_Deprecated>
    </div>
  </div>
);

export default StyleTile;
