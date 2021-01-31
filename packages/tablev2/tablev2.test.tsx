import React from "react";
import { mount } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";

import { Table } from "./";
import { DropdownMenuCell } from "./DropdownMenuCell";
import { TooltipHeaderCell } from "./TooltipHeaderCell";
import { EmptyCell } from "./EmptyCell";
import { MutedCell } from "./MutedCell";
import { DropdownMenuItem, DropdownSection } from "../dropdownMenu";
import { Sorter } from "./Util";

expect.addSnapshotSerializer(serializer);

const mockData = [
  {
    name: "A",
    username: "Edwina.Denesik",
    email: "Brook88@gmail.com",
    phone: "335-202-4870 x666",
    website: "aurelia.org",
    company: "Lemke LLC",
    id: 0
  },
  {
    name: "D",
    username: "Gracie.Feil23",
    email: "Guillermo.Nitzsche19@yahoo.com",
    phone: "1-446-437-5562 x3257",
    website: "lulu.info",
    company: "Daugherty and Sons",
    id: 1
  },
  {
    name: "E",
    username: "Adolfo_Morissette",
    email: "Freddy.Willms21@yahoo.com",
    phone: "1-236-316-1208 x18261",
    website: "delbert.net",
    company: "Kuhlman and Sons",
    id: 2
  },
  {
    name: "C",
    username: "Matt96",
    email: "Sheridan23@gmail.com",
    phone: "098.378.2656",
    website: "serena.net",
    company: "Romaguera, Walker and Anderson",
    id: 3
  },
  {
    name: "B",
    username: "Winifred.Kassulke45",
    email: "Martin_Metz24@gmail.com",
    phone: "1-126-037-4313",
    website: "art.name",
    company: "Mante - McGlynn",
    id: 4
  }
];

/* tslint:disable:jsx-no-lambda */
// This set of columns is meant to cover as many features as possible.
// It uses the following features:
// - <Column textAlign>
// - <Column initialWidth>
// - <Column sorter>
// - Cells rendered using <EmptyCell>
// - Cells rendered using <MutedCell>
// - Cells rendered using <DropdownMenuCell>
// - Cells rendered using <TooltipHeaderCell>
const featureRichColumns = [
  {
    id: "name",
    header: <div>Name</div>,
    textAlign: "left" as React.CSSProperties["textAlign"],
    render: x => (
      <a href={`http://google.com/?q=${encodeURIComponent(x.name)}`}>
        {x.name}
      </a>
    ),
    initialWidth: "300px",
    sorter: Sorter.string("name")
  },
  {
    id: "username",
    header: (
      <TooltipHeaderCell tooltipContent="test">Username</TooltipHeaderCell>
    ),
    textAlign: "center" as React.CSSProperties["textAlign"],
    render: x => x.username,
    initialWidth: "minmax(300px, 1fr)"
  },
  {
    id: "email",
    header: "Email",
    textAlign: "right" as React.CSSProperties["textAlign"],
    render: x => x.email
  },
  {
    id: "phone",
    header: "Phone",
    render: x => x.phone
  },
  {
    id: "company",
    header: "Company",
    render: x => x.company
  },
  {
    id: "website",
    header: "Website",
    render: x => <a href={x.website}>{x.website}</a>
  },
  {
    id: "empty",
    header: "Empty",
    render: () => <EmptyCell />
  },
  {
    id: "muted",
    header: "Muted",
    render: () => <MutedCell>No data is available.</MutedCell>
  },
  {
    id: "dropdown",
    header: "",
    render: () => (
      <DropdownMenuCell>
        <DropdownSection>
          <DropdownMenuItem key="edit" value="edit">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem key="scale" value="scale">
            Scale
          </DropdownMenuItem>
          <DropdownMenuItem key="restart" value="restart">
            Restart
          </DropdownMenuItem>
          <DropdownMenuItem key="stop" value="stop">
            Stop
          </DropdownMenuItem>
        </DropdownSection>
      </DropdownMenuCell>
    )
  }
];

describe("Table v2", () => {
  window.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    root: null,
    rootMargin: "0px",
    disconnect: jest.fn(),
    thresholds: [0],
    takeRecords: () => [
      {
        boundingClientRect: {
          x: 0,
          y: 0,
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          height: 0,
          width: 0,
          toJSON: () => null
        },
        intersectionRatio: 0,
        intersectionRect: {
          x: 0,
          y: 0,
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          height: 0,
          width: 0,
          toJSON: () => null
        },
        isIntersecting: false,
        rootBounds: null,
        target: document.getElementsByTagName("div")[0],
        time: 0
      }
    ]
  }));
  describe("rendering", () => {
    it("renders default", () => {
      const component = mount(
        <Table
          data={mockData}
          toId={el => el.id.toString()}
          columns={featureRichColumns}
        />
      );

      expect(toJson(component)).toMatchSnapshot();
    });
    it("renders without a sticky first column", () => {
      const component = mount(
        <Table
          data={mockData}
          toId={el => el.id.toString()}
          columns={featureRichColumns}
          stickyFirstCol={false}
        />
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("onStateChange", () => {
    it("calls onStateChange when a column is sorted", () => {
      const onStateChange = jest.fn();
      const component = mount(
        <Table
          data={mockData}
          toId={el => el.id.toString()}
          columns={featureRichColumns}
          initialSorter={{ by: "name", order: "asc" }}
          onStateChange={onStateChange}
        />
      );

      component.find("div#name button").simulate("click");

      expect(onStateChange).toHaveBeenCalledWith(
        expect.objectContaining({ sortBy: "name", order: "desc" })
      );
    });
    // TODO: figure out how we could simulate resizing
    it.skip("calls onStateChange when a column is resized", () => {});
  });

  describe("Sorting", () => {
    it("calls the function passed to the 'sorter' prop when clicking the table headings", () => {
      const sorterFn = jest.fn();
      const component = mount(
        <Table
          data={mockData}
          toId={el => el.id.toString()}
          columns={[
            {
              id: "name",
              header: <div>Name</div>,
              textAlign: "left",
              render: x => (
                <a href={`http://google.com/?q=${encodeURIComponent(x.name)}`}>
                  {x.name}
                </a>
              ),
              initialWidth: "300px",
              sorter: sorterFn
            }
          ]}
          initialSorter={{ by: "name", order: "asc" }}
        />
      );

      expect(sorterFn).toHaveBeenCalledWith("asc", 1);
      component.find("#name button").simulate("click");
      expect(sorterFn).toHaveBeenCalledWith("desc", -1);
    });
    it("sorts strings with Sorter.string", () => {
      const nameSort = Sorter.string("name");
      const ascSort = nameSort("asc", -1);
      const descSort = nameSort("desc", 1);

      expect(mockData.sort(ascSort)[0].name).toBe("E");
      expect(mockData.sort(descSort)[0].name).toBe("A");
    });
    it("sorts numbers with Sorter.number", () => {
      const nameSort = Sorter.number("id");
      const ascSort = nameSort("asc", -1);
      const descSort = nameSort("desc", 1);

      expect(mockData.sort(ascSort)[0].id).toBe(4);
      expect(mockData.sort(descSort)[0].id).toBe(0);
    });
  });
});
/* tslint:enable */
