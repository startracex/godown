import { booleanArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./select";

export default {
  title: "input/Select",
  component: "godown-select",
  tags: ["autodocs"],
  render,
  argTypes: {
    disabled: booleanArgs,
    direction: {
      control: "select",
      options: [
        "top",
        "bottom",
      ],
      table: {
        type: {
          summary: "top | bottom",
        },
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
      table: {
        type: { summary: "string" },
      },
    },
    multiple: booleanArgs,
  },
  args: {
    disabled: false,
    multiple: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
