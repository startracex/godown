import { booleanArgs, stringArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./details";

export default {
  title: "display/Details",
  component: "godown-details",
  tags: ["autodocs"],
  render,
  argTypes: {
    summary: stringArgs,
    open: booleanArgs,
  },
  args: {
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
