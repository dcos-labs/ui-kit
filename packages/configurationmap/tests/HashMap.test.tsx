import React from "react";
import serializer from "@emotion/jest";
import { render, shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { HashMap } from "../";

expect.addSnapshotSerializer(serializer);

describe("HashMap", () => {
  it("renders default", () => {
    expect(toJSON(render(<HashMap hash={{ foo: "bar" }} />))).toMatchSnapshot();
  });

  it("renders array value", () => {
    expect(
      toJSON(render(<HashMap hash={{ foo: ["foo", "bar", "baz"] }} />))
    ).toMatchSnapshot();
  });

  it("renders boolean value", () => {
    expect(toJSON(render(<HashMap hash={{ foo: true }} />))).toMatchSnapshot();
  });

  it("renders empty value", () => {
    expect(
      toJSON(render(<HashMap defaultValue="empty" hash={{ foo: "" }} />))
    ).toMatchSnapshot();
  });

  it("renders with a headline", () => {
    expect(
      toJSON(render(<HashMap hash={{ foo: "bar" }} headline="baz" />))
    ).toMatchSnapshot();
  });
  it("renders with nested object hash", () => {
    expect(
      toJSON(render(<HashMap hash={{ foo: { bar: "baz" } }} />))
    ).toMatchSnapshot();
  });

  it("returns null if hash is not passed", () => {
    const instance = shallow(<HashMap />);
    expect(instance.type()).toEqual(null);
  });

  it("returns null if hash is not passed with headline", () => {
    const instance = shallow(<HashMap headline="foo" />);

    expect(instance.type()).toEqual(null);
  });

  it("returns null if undefined is passed to hash", () => {
    const instance = shallow(<HashMap hash={undefined} />);

    expect(instance.type()).toEqual(null);
  });

  it("returns null if empty object is passed to hash", () => {
    const instance = shallow(<HashMap hash={{}} />);

    expect(instance.type()).toEqual(null);
  });
});
