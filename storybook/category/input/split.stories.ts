import { ArgHelper, booleanArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./split";

export default {
  title: "input/Split",
  component: "godown-split",
  tags: ["autodocs"],
  render,
  argTypes: {
    disabled: booleanArg,
    "outline-type": new ArgHelper().options([
      "border",
      "outline",
      "box-shadow",
      "outline-inset",
      "box-shadow-inset",
    ]).arg,
    len: new ArgHelper().type("number").control("number", { min: 1 }).default("6").arg,
  },
  args: {
    len: 6,
    disabled: false,
    "outline-type": "border",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
