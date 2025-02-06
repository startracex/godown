import { ArgHelper, booleanArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./select";

export default {
  title: "input/Select",
  component: "godown-select",
  tags: ["autodocs"],
  render,
  argTypes: {
    disabled: booleanArg,
    direction: new ArgHelper().options([
      "top",
      "bottom",
    ]).arg,
    "outline-type": new ArgHelper().options([
      "border",
      "outline",
      "box-shadow",
      "outline-inset",
      "box-shadow-inset",
    ]).arg,
    placeholder: new ArgHelper().type("string").arg,
    multiple: booleanArg,
  },
  args: {
    disabled: false,
    "outline-type": "border",
    multiple: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
