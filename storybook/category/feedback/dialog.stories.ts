import { ArgHelper, booleanArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./dialog";

export default {
  title: "feedback/Dialog",
  component: "godown-dialog",
  tags: ["autodocs"],
  render,
  argTypes: {
    direction: new ArgHelper().options([
      "center",
      "left",
      "right",
      "top",
      "bottom",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
    ]).arg,
    open: booleanArg,
    modal: booleanArg,
  },
  args: {
    direction: "center",
    modal: false,
    open: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
