import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./time";

export default {
  title: "display/Time",
  component: "godown-time",
  tags: ["autodocs"],
  render,
  argTypes: {
    timeout: new ArgHelper().type("number").type("number").arg,
    time: new ArgHelper().type("Date").control("date").arg,
    gap: new ArgHelper().type("number").type("number").arg,
    escape: new ArgHelper().type("string").default("%").arg,
  },
  args: {
    format: "YYYY-MM-DD hh:mm:ss UTFZ",
    timeout: 1000,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithGap = {
  args: {
    gap: -1000,
  },
};

export const WithFormat = {
  args: {
    format: "YYYY-MM-DD",
  },
};
