import { booleanArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./divider";

export default {
  title: "layout/Divider",
  component: "godown-divider",
  tags: ["autodocs"],
  render,
  argTypes: {
    vertical: booleanArgs,
  },
  args: {
    vertical: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
