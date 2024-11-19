import { booleanArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./range";

export default {
  title: "input/Range",
  component: "godown-range",
  tags: ["autodocs"],
  render,
  argTypes: {
    disabled: booleanArgs,
    step: {
      control: {
        type: "number",
        min: 1,
      },
      table: {
        type: {
          summary: "number",
        },
      },
    },
    value: {
      control: {
        type: "object",
      },
      table: {
        type: {
          summary: "number | number[]",
        },
      },
    },
    vertical: booleanArgs,
  },
  args: {
    disabled: false,
    max: 100,
    min: 0,
    value: [0, 50],
    vertical: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
