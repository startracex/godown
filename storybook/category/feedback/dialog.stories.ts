import { booleanArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./dialog";

export default {
  title: "feedback/Dialog",
  component: "godown-dialog",
  tags: ["autodocs"],
  render,
  argTypes: {
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
