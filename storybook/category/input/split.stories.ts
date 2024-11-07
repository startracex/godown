import { RendererMeta } from "../../types";
import render from "./split";

export default {
  title: "input/Split",
  component: "godown-split",
  tags: ["autodocs"],
  render,
  argTypes: {
    len: {
      control: "number",
      min: 1,
    },
  },
  args: {
    len: 6,
    disabled: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
