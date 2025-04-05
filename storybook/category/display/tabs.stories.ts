import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./tabs";

export default {
  title: "display/Tabs",
  component: "godown-tabs",
  tags: ["autodocs"],
  render,
  argTypes: {
    index: new ArgHelper().type("number").default("0").arg,
    tabs: new ArgHelper().type("string[]").arg,
    useSlot: new ArgHelper().type("boolean").default("false").arg,
    "ring-type": new ArgHelper().options([
      "border",
      "outline",
      "box-shadow",
      "outline-inset",
      "shadow",
    ]).arg,
  },
  args: {
    index: 0,
    tabs: ["Tab 1", "Tab 2", "Tab 3"],
    useSlot: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
