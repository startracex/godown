import { ArgHelper, booleanArg } from "../../args";
import { RendererMeta } from "../../types";
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
    placeholder: new ArgHelper().type("string").control("text").arg,
    multiple: booleanArg,
  },
  args: {
    disabled: false,
    multiple: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
