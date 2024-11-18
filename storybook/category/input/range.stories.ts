import { RendererMeta } from "../../types";
import render from "./range";

export default {
  title: "input/Range",
  component: "godown-range",
  tags: ["autodocs"],
  render,
  argTypes: {
    step: {
      control: "number",
      min: 1,
    },
  },
  args: {
    disabled: false,
    value: [0, 50],
    min: 0,
    max: 100,
    vertical: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
