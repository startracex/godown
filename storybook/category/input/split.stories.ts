import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./split";

export default {
  title: "input/Split",
  component: "godown-split",
  tags: ["autodocs"],
  render,
  argTypes: {
    disabled: new ArgHelper().type("boolean").default("false").arg,
    "ring-type": new ArgHelper().options([
      "border",
      "outline",
      "shadow",
      "outline-inset",
      "shadow-inset",
    ]).arg,
    len: new ArgHelper().type("number").control("number", { min: 1 }).default("6").arg,
    index: new ArgHelper().type("number").default("-1").arg,
  },
  args: {
    len: 6,
    disabled: false,
    "ring-type": "border",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
