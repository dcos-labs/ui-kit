import React from "react";
import { shallow, mount } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";

import Pagination, { getItemCountString } from "./Pagination";
import PaginationContainer from "./PaginationContainer";

expect.addSnapshotSerializer(serializer);

describe("Pagination", () => {
  describe("rendering", () => {
    it("renders default", () => {
      const component = shallow(
        <Pagination initialActivePage={4} initialPageLength={20} />
      );

      expect(toJson(component)).toMatchSnapshot();
    });

    it("renders wrapped in a PaginationContainer", () => {
      const component = shallow(
        <PaginationContainer vertAlignChildren="flex-end">
          <Pagination initialActivePage={4} initialPageLength={20} />
        </PaginationContainer>
      );

      expect(toJson(component)).toMatchSnapshot();
    });

    it("renders w/ custom item label", () => {
      const component = shallow(
        <Pagination
          itemsLabel="things"
          initialActivePage={4}
          initialPageLength={20}
        />
      );

      expect(toJson(component)).toMatchSnapshot();
    });

    it("renders w/ totalItems set", () => {
      const component = shallow(
        <Pagination
          totalItems={200}
          initialActivePage={4}
          initialPageLength={20}
        />
      );

      expect(toJson(component)).toMatchSnapshot();
    });

    it("renders w/ totalPages, pageLength, and totalItems set", () => {
      const component = shallow(
        <Pagination
          totalPages={20}
          pageLength={10}
          totalItems={200}
          initialActivePage={4}
          initialPageLength={20}
        />
      );

      expect(toJson(component)).toMatchSnapshot();
    });

    it("renders prev and next buttons as links", () => {
      const component = shallow(
        <Pagination
          prevUrl="prev"
          nextUrl="next"
          initialActivePage={4}
          initialPageLength={20}
        />
      );

      expect(toJson(component)).toMatchSnapshot();
    });

    it("renders w/ page length menu", () => {
      const component = shallow(
        <Pagination
          showPageLengthMenu={true}
          initialPageLength={100}
          initialActivePage={4}
        />
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("getItemCountString", () => {
    it("returns {start}-{end} of {total} if all params are passed", () => {
      expect(getItemCountString(2, "items", 20, 60)).toEqual(
        "21–40 of 60 items"
      );
    });

    it("returns {start}-{end} if totalItems param isn't passed", () => {
      expect(getItemCountString(2, "items", 20)).toEqual("21–40");
    });
  });

  describe("page navigation functionality", () => {
    it("increments number input value when 'next' button is clicked", () => {
      const component = mount(
        <Pagination
          showPageLengthMenu={true}
          initialPageLength={100}
          initialActivePage={4}
        />
      );

      expect(component.find("input").prop("value")).toEqual(4);
      component.find("button[aria-label='next page']").simulate("click");
      expect(component.find("input").prop("value")).toEqual(5);
    });

    it("decrements number input value when 'prev' button is clicked", () => {
      const component = mount(<Pagination initialActivePage={4} />);

      expect(component.find("input").prop("value")).toEqual(4);
      component.find("button[aria-label='previous page']").simulate("click");
      expect(component.find("input").prop("value")).toEqual(3);
    });

    it("disables the next button when the user is on the last page", () => {
      const component = mount(
        <Pagination initialActivePage={5} totalPages={5} />
      );

      expect(
        component.find("button[aria-label='next page']").prop("disabled")
      ).toEqual(true);
    });

    it("disables the prev button when the user is on the first page", () => {
      const component = mount(<Pagination initialActivePage={1} />);

      expect(
        component.find("button[aria-label='previous page']").prop("disabled")
      ).toEqual(true);
    });

    it("calls onChange prop when page length menu is changed", () => {
      const onChange = jest.fn();
      const component = mount(
        <Pagination
          showPageLengthMenu={true}
          initialActivePage={4}
          onChange={onChange}
        />
      );

      expect(onChange).not.toHaveBeenCalled();
      component.find("select").simulate("change");
      expect(onChange).toHaveBeenCalledWith(4, 30);
    });

    it("calls onChange prop when page text input is changed and submitted", () => {
      const onChange = jest.fn();
      const component = mount(
        <Pagination
          showPageLengthMenu={true}
          initialActivePage={4}
          onChange={onChange}
        />
      );

      expect(onChange).not.toHaveBeenCalled();
      component.find("input").simulate("change");
      component.find("form").simulate("submit");
      expect(onChange).toHaveBeenCalledWith(4, 30);
    });
  });
});
