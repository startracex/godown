import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./select";

export default {
  title: "input/Select",
  component: "godown-select",
  tags: ["autodocs"],
  render,
  argTypes: {
    disabled: new ArgHelper().type("boolean").default("false").arg,
    direction: new ArgHelper().options([
      "top",
      "bottom",
    ]).arg,
    "ring-type": new ArgHelper().options([
      "border",
      "outline",
      "shadow",
      "outline-inset",
      "shadow-inset",
    ]).arg,
    placeholder: new ArgHelper().type("string").arg,
    multiple: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    disabled: false,
    "ring-type": "border",
    multiple: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
