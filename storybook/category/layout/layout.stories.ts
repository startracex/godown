import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./layout";

export default {
  title: "layout/Layout",
  component: "godown-layout",
  tags: ["autodocs"],
  render,
  argTypes: {
    sticky: new ArgHelper().type("boolean").default("false").arg,
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
