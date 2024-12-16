import { booleanArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./layout";

export default {
  title: "layout/Layout",
  component: "godown-layout",
  tags: ["autodocs"],
  render,
  argTypes: {
    noHeader: booleanArg,
    noFooter: booleanArg,
    sticky: booleanArg,
  },
  args: {
    noHeader: false,
    noFooter: false,
    sticky: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const NoHeader = {
  args: {
    noHeader: true,
  },
};

export const NoFooter = {
  args: {
    noFooter: true,
  },
};

export const Sticky = {
  args: {
    sticky: true,
  },
};
