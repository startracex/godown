import { booleanArg, stringArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./details";

export default {
  title: "display/Details",
  component: "godown-details",
  tags: ["autodocs"],
  render,
  argTypes: {
    fill: booleanArg,
    float: booleanArg,
    summary: stringArg,
    open: booleanArg,
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
