import React from "react";
import { createSerializer } from "@emotion/jest";
import { shallow, render, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { CheckboxTable_Deprecated, Column } from "../";

expect.addSnapshotSerializer(createSerializer());

describe("CheckboxTable", () => {
  const items = [
    {
      name: "Brian Vaughn",
      role: "Software Engineer",
      city: "San Jose",
      state: "CA",
      zipcode: 95125
    },
    {
      name: "Jon Doe",
      role: "Product engineer",
      city: "Mountain View",
      state: "CA",
      zipcode: 95125
    }
  ];

  const nameCellRenderer = ({ name }: { name?: string }) => (
    <strong>{name}</strong>
  );
  const cityCellRenderer = ({ city }: { city?: string }) => (
    <strong>{city}</strong>
  );
  const roleCellRenderer = ({ role }: { role?: string }) => <em>{role}</em>;
  const stateCellRenderer = ({ state }: { state?: string }) => (
    <span>{state}</span>
  );
  const zipcodeCellRenderer = ({ zipcode }: { zipcode?: string }) => (
    <span>{zipcode}</span>
  );

  it("renders default", () => {
    const component = render(
      <CheckboxTable_Deprecated data={items} uniqueKey="name">
        <Column header="name" cellRenderer={nameCellRenderer} />
        <Column header="role" cellRenderer={roleCellRenderer} />
        <Column header="state" cellRenderer={stateCellRenderer} />
        <Column header="zipcode" cellRenderer={zipcodeCellRenderer} />
        <Column header="city" cellRenderer={cityCellRenderer} />
      </CheckboxTable_Deprecated>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with checked row", () => {
    const component = render(
      <CheckboxTable_Deprecated
        data={items}
        selectedRows={{ [items[0].name]: true }}
        uniqueKey="name"
      >
        <Column header="name" cellRenderer={nameCellRenderer} />
        <Column header="role" cellRenderer={roleCellRenderer} />
        <Column header="state" cellRenderer={stateCellRenderer} />
        <Column header="zipcode" cellRenderer={zipcodeCellRenderer} />
        <Column header="city" cellRenderer={cityCellRenderer} />
      </CheckboxTable_Deprecated>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with disabled and muted row", () => {
    const component = render(
      <CheckboxTable_Deprecated
        data={items}
        disabledRows={{ [items[0].name]: true }}
        mutedRows={{ [items[0].name]: true }}
        uniqueKey="name"
      >
        <Column header="name" cellRenderer={nameCellRenderer} />
        <Column header="role" cellRenderer={roleCellRenderer} />
        <Column header="state" cellRenderer={stateCellRenderer} />
        <Column header="zipcode" cellRenderer={zipcodeCellRenderer} />
        <Column header="city" cellRenderer={cityCellRenderer} />
      </CheckboxTable_Deprecated>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("checks header checkbox when all selectable rows are selected", () => {
    const component = render(
      <CheckboxTable_Deprecated
        data={items}
        disabledRows={{ [items[0].name]: true }}
        selectedRows={items.slice(1).map(item => ({ [item.name]: true }))}
        uniqueKey="name"
      >
        <Column header="name" cellRenderer={nameCellRenderer} />
        <Column header="role" cellRenderer={roleCellRenderer} />
        <Column header="state" cellRenderer={stateCellRenderer} />
        <Column header="zipcode" cellRenderer={zipcodeCellRenderer} />
        <Column header="city" cellRenderer={cityCellRenderer} />
      </CheckboxTable_Deprecated>
    );

    expect(component.find("#headerCheckbox").prop("aria-checked")).not.toBe(
      "mixed"
    );
    expect(component.find("#headerCheckbox").prop("checked")).toBe(true);
  });

  it("does not check header checkbox when all rows are not selected", () => {
    const component = render(
      <CheckboxTable_Deprecated
        data={items}
        selectedRows={{ [items[0].name]: true }}
        uniqueKey="name"
      >
        <Column header="name" cellRenderer={nameCellRenderer} />
        <Column header="role" cellRenderer={roleCellRenderer} />
        <Column header="state" cellRenderer={stateCellRenderer} />
        <Column header="zipcode" cellRenderer={zipcodeCellRenderer} />
        <Column header="city" cellRenderer={cityCellRenderer} />
      </CheckboxTable_Deprecated>
    );
    expect(component.find("#headerCheckbox").prop("checked")).toBe(false);
  });

  it("calls onChange prop with the selected rows data", () => {
    const onChangeFn = jest.fn();
    const component = shallow(
      <CheckboxTable_Deprecated
        data={items}
        onChange={onChangeFn}
        uniqueKey="name"
      >
        <Column header="name" cellRenderer={nameCellRenderer} />
        <Column header="role" cellRenderer={roleCellRenderer} />
        <Column header="state" cellRenderer={stateCellRenderer} />
        <Column header="zipcode" cellRenderer={zipcodeCellRenderer} />
        <Column header="city" cellRenderer={cityCellRenderer} />
      </CheckboxTable_Deprecated>
    );
    const cellRendererResult = component
      .find(Column)
      .first()
      .prop("cellRenderer")(items[0], 100) as React.ReactElement<{
      children: any;
    }>;
    const checkbox = mount(cellRendererResult.props.children).find("input");

    expect(onChangeFn).not.toHaveBeenCalled();
    checkbox.simulate("change", { target: { checked: true } });
    expect(onChangeFn).toHaveBeenCalledWith({ [items[0].name]: true });
    checkbox.simulate("change", { target: { checked: false } });
    expect(onChangeFn).toHaveBeenCalledWith({});
  });

  it("toggles all selectable rows with header checkbox", () => {
    const onChangeFn = jest.fn();
    const component = shallow(
      <CheckboxTable_Deprecated
        data={items}
        disabledRows={{ [items[0].name]: true }}
        onChange={onChangeFn}
        uniqueKey="name"
      >
        <Column header="name" cellRenderer={nameCellRenderer} />
        <Column header="role" cellRenderer={roleCellRenderer} />
        <Column header="state" cellRenderer={stateCellRenderer} />
        <Column header="zipcode" cellRenderer={zipcodeCellRenderer} />
        <Column header="city" cellRenderer={cityCellRenderer} />
      </CheckboxTable_Deprecated>
    );
    const headerContent = component
      .find(Column)
      .first()
      .prop("header") as React.ReactElement<{ children: any }>;
    const checkboxComponent = shallow(headerContent.props.children);

    expect(onChangeFn).not.toHaveBeenCalled();
    checkboxComponent
      .find("#headerCheckbox")
      .simulate("change", { target: { checked: true } });

    expect(onChangeFn).toHaveBeenCalledWith(
      items.slice(1).reduce((acc, curr) => {
        acc[curr.name] = true;
        return acc;
      }, {})
    );
    checkboxComponent
      .find("#headerCheckbox")
      .simulate("change", { target: { checked: false } });
    expect(onChangeFn).toHaveBeenCalledWith({});
  });
});
