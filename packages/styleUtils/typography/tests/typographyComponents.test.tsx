import React from "react";
import { shallow } from "enzyme";
import serializer from "@emotion/jest";
import toJson from "enzyme-to-json";

import {
  CaptionText,
  DangerText,
  HeadingText1,
  HeadingText2,
  HeadingText3,
  InteractiveText,
  MonospaceText,
  SmallText,
  SuccessText,
  Text,
  TextBlock,
  WarningText
} from "../";

expect.addSnapshotSerializer(serializer);

const allComponents = [
  Text,
  CaptionText,
  DangerText,
  HeadingText1,
  HeadingText2,
  HeadingText3,
  InteractiveText,
  MonospaceText,
  SmallText,
  SuccessText,
  WarningText
];

describe("Typography", () => {
  it("renders all default", () => {
    allComponents.forEach(component => {
      const TypographyComponent = component;
      const shallowRenderComponent = shallow(
        <TypographyComponent tag="p" wrap="wrap" align="left">
          content
        </TypographyComponent>
      );

      expect(toJson(shallowRenderComponent)).toMatchSnapshot();
    });
  });

  describe("Text", () => {
    it("renders all props", () => {
      const component = shallow(
        <Text
          align="center"
          tag="span"
          wrap="nowrap"
          weight="medium"
          color="black"
          size="s"
          className="test"
        >
          content
        </Text>
      );

      expect(toJson(component)).toMatchSnapshot();
    });
    it("renders all wrap variants", () => {
      type WrapVariant = "truncate" | "nowrap" | "wrap";

      ["truncate", "nowrap", "wrap"].forEach(wrapVariant => {
        const component = shallow(
          <Text
            tag="p"
            align="left"
            size="m"
            weight="normal"
            color="black"
            wrap={wrapVariant as WrapVariant}
          >
            content
          </Text>
        );

        expect(toJson(component)).toMatchSnapshot();
      });
    });
  });

  describe("CaptionText", () => {
    it("renders all props", () => {
      const component = shallow(
        <CaptionText align="center" tag="span" wrap="nowrap">
          content
        </CaptionText>
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("DangerText", () => {
    it("renders all props", () => {
      const component = shallow(
        <DangerText
          align="center"
          tag="span"
          wrap="nowrap"
          weight="medium"
          size="l"
        >
          content
        </DangerText>
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("HeadingText", () => {
    it("renders all props all HeadingText variants", () => {
      [HeadingText1, HeadingText2, HeadingText3].forEach(component => {
        const HeadingComponent = component;
        const shallowRenderComponent = shallow(
          <HeadingComponent color="black" align="center" tag="h1" wrap="nowrap">
            content
          </HeadingComponent>
        );

        expect(toJson(shallowRenderComponent)).toMatchSnapshot();
      });
    });
  });

  describe("InteractiveText", () => {
    it("renders all props", () => {
      const component = shallow(
        <InteractiveText
          align="center"
          tag="span"
          wrap="nowrap"
          weight="medium"
          size="l"
        >
          content
        </InteractiveText>
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("MonospaceText", () => {
    it("renders all props", () => {
      const component = shallow(
        <MonospaceText
          align="center"
          tag="span"
          wrap="nowrap"
          weight="medium"
          size="l"
          color="black"
        >
          content
        </MonospaceText>
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("SmallText", () => {
    it("renders all props", () => {
      const component = shallow(
        <SmallText
          color="black"
          align="center"
          tag="span"
          wrap="nowrap"
          weight="medium"
        >
          content
        </SmallText>
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("SuccessText", () => {
    it("renders all props", () => {
      const component = shallow(
        <SuccessText
          align="center"
          tag="span"
          wrap="nowrap"
          weight="medium"
          size="l"
        >
          content
        </SuccessText>
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("WarningText", () => {
    it("renders all props", () => {
      const component = shallow(
        <WarningText
          align="center"
          tag="span"
          wrap="nowrap"
          weight="medium"
          size="l"
        >
          content
        </WarningText>
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe("TextBlock", () => {
    it("renders all props", () => {
      const component = shallow(
        <TextBlock>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </TextBlock>
      );

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
