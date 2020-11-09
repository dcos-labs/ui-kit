import { addParameters } from "@storybook/react";
import { create } from '@storybook/theming/create';
import { iconDecorator } from "../decorators/iconDecorator";

addParameters({
    docs: {
      extractComponentDescription: (component, { notes }) => {
        if (notes) {
          return typeof notes === 'string' ? notes : notes.markdown || notes.text;
        }
        return null;
      },
    },
    options: {
      theme: create({
        brandTitle: "Mesosphere UI Kit",
        brandUrl: "#",
      }),
    }
  });

export const decorators = [
  iconDecorator,
];
