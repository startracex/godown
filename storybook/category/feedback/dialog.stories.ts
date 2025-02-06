import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./dialog";

export default {
  title: "feedback/Dialog",
  component: "godown-dialog",
  tags: ["autodocs"],
  render,
  argTypes: {
    open: new ArgHelper().type("boolean").default("false").arg,
    modal: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    direction: "center",
    modal: false,
    open: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
