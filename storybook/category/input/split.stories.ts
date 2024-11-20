import { ArgHelper, booleanArg } from "../../args";
import { RendererMeta } from "../../types";
import render from "./split";

export default {
  title: "input/Split",
  component: "godown-split",
  tags: ["autodocs"],
  render,
  argTypes: {
    len: new ArgHelper().type("number").control("number", { min: 1 }).default("6").arg,
    disabled: booleanArg,
  },
  args: {
    len: 6,
    disabled: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
