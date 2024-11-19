import { booleanArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./layout";

export default {
  title: "layout/Layout",
  component: "godown-layout",
  tags: ["autodocs"],
  render,
  argTypes: {
    noHeader: booleanArgs,
    noFooter: booleanArgs,
    sticky: booleanArgs,
  },
  args: {
    noHeader: false,
    noFooter: false,
    sticky: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
