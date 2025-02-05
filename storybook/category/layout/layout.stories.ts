import { booleanArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./layout";

export default {
  title: "layout/Layout",
  component: "godown-layout",
  tags: ["autodocs"],
  render,
  argTypes: {
    sticky: booleanArg,
  },
  args: {
    sticky: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Sticky = {
  args: {
    sticky: true,
  },
};
