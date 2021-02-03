import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { Typeahead, TextInput } from "../../index";
import MultiselectTypeahead from "./helpers/MultiselectTypeahead";
import FilteredListTypeahead from "./helpers/FilteredListTypeahead";
import { padding } from "../../shared/styles/styleUtils";
import { complexItems, items } from "./helpers/itemMocks";
import { css } from "@emotion/css";

import readme from "../README.md";

const storyWrapper = css`
  width: 300px;
`;

storiesOf("Forms|Typeahead", module)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add("default", () => (
    <div className={storyWrapper}>
      <Typeahead
        items={items}
        textField={
          <TextInput
            id="default"
            inputLabel="Default"
            placeholder="Placeholder"
          />
        }
      />
    </div>
  ))
  .add("menu has max height", () => (
    <div className={storyWrapper}>
      <Typeahead
        items={items}
        textField={
          <TextInput
            id="maxHeight"
            inputLabel="Menu max height"
            placeholder="Placeholder"
          />
        }
        menuMaxHeight={100}
      />
    </div>
  ))
  .add("pre-filled selectedItem", () => (
    <div className={storyWrapper}>
      <Typeahead
        items={items}
        selectedItems={[items[1].value]}
        textField={
          <TextInput
            id="prefilled"
            inputLabel="Pre-filled"
            placeholder="Placeholder"
            hintContent="This is acting as a controlled input, so the value won't change"
            value={items[1].value}
          />
        }
      />
    </div>
  ))
  .add("with onSelect callback", () => {
    const onSelectHandler = selectedItems => {
      alert(`${selectedItems[0]} selected`);
    };
    return (
      <div className={storyWrapper}>
        <Typeahead
          items={items}
          onSelect={onSelectHandler}
          textField={
            <TextInput
              id="onselect"
              inputLabel="onSelect"
              placeholder="Placeholder"
            />
          }
        />
      </div>
    );
  })
  .add(
    "multiselect",
    () => (
      <div className={storyWrapper}>
        <MultiselectTypeahead>
          {({ items, selectHandler, selectedItems }) => (
            <Typeahead
              items={items}
              selectedItems={selectedItems}
              multiSelect={true}
              textField={
                <TextInput
                  id="multiselect"
                  inputLabel="Multiselectable"
                  placeholder="Placeholder"
                />
              }
              onSelect={selectHandler}
            />
          )}
        </MultiselectTypeahead>
      </div>
    ),
    {
      info: {
        text: "Story source:"
      }
    }
  )
  .add("complex list items", () => (
    <div className={storyWrapper}>
      <Typeahead
        items={complexItems}
        textField={
          <TextInput
            id="complex"
            inputLabel="Elements as items"
            placeholder="Placeholder"
          />
        }
      />
    </div>
  ))
  .add("with a disabled item", () => (
    <div className={storyWrapper}>
      <Typeahead
        items={[
          ...items,
          { label: "K8sphere", value: "K8sphere", disabled: true }
        ]}
        textField={
          <TextInput
            id="default"
            inputLabel="With a disabled item"
            placeholder="Placeholder"
          />
        }
      />
    </div>
  ))
  .add("filter while typing", () => (
    <div className={storyWrapper}>
      <FilteredListTypeahead items={items} />
    </div>
  ))
  .add("custom menu empty state", () => (
    <div className={storyWrapper}>
      <FilteredListTypeahead
        menuEmptyState={<div className={padding("all")}>Nothing to show</div>}
        items={items}
      />
    </div>
  ));
