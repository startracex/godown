import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./progress";

export default {
  title: "feedback/Progress",
  component: "godown-progress",
  tags: ["autodocs"],
  render,
  argTypes: {
    value: new ArgHelper().type("number").control("number", {
      max: 100,
      min: 0,
    }).arg,
    max: new ArgHelper().type("number").control("number").default("100").arg,
    min: new ArgHelper().type("number").control("number").default("0").arg,
  },
  args: {
    max: 100,
    min: 0,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithValue = {
  args: {
    value: 70,
  },
};
