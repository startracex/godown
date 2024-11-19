import { booleanArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./split";

export default {
  title: "input/Split",
  component: "godown-split",
  tags: ["autodocs"],
  render,
  argTypes: {
    len: {
      control: {
        type: "number",
        min: 1,
      },
      table: {
        defaultValue: { summary: "6" },
      },
    },
    disabled: booleanArgs,
  },
  args: {
    len: 6,
    disabled: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
