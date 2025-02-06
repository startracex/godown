import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./details";

export default {
  title: "display/Details",
  component: "godown-details",
  tags: ["autodocs"],
  render,
  argTypes: {
    fill: new ArgHelper().type("boolean").default("false").arg,
    float: new ArgHelper().type("boolean").default("false").arg,
    summary: new ArgHelper().type("string").default("").arg,
    open: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    fill: false,
    float: false,
    summary: "Summary",
    open: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Opened = {
  args: {
    open: true,
  },
};
