import * as React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import styled from "@emotion/styled";
import { coreColors } from "../../design-tokens/build/js/colorsForStyleguide";

const { white, black, cyan, ...colors } = coreColors();

interface CellProps {
  background?: string;
}

const Grid = styled("div")`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  max-width: 100%;
`;

const spread = "1";

const Cell = styled("div")`
  background-color: ${(props: CellProps) =>
    props.background ? props.background : "transparent"};
  color: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 1rem 0.2rem;
  &:hover {
    color: ${black};
    text-shadow: 1px 1px ${spread}px ${white}, 1px -1px ${spread}px ${white},
      -1px 1px ${spread}px ${white}, -1px -1px ${spread}px ${white};
  }
`;

const ColorTable = () => (
  <Grid>
    {Object.entries(colors).map(([name, color]) => (
      <Cell background={color}>{name}</Cell>
    ))}

    <Cell background={cyan}>cyan</Cell>
    <Cell background={white}>white</Cell>
    <Cell background={black}>black</Cell>
  </Grid>
);

storiesOf("Colors", module)
  .addDecorator(withReadme([``]))
  .add("Color table", () => <ColorTable />);
