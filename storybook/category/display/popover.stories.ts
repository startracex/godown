import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render, { allPositions } from "./popover";

export default {
  title: "display/Popover",
  component: "godown-popover",
  tags: ["autodocs"],
  render,
  argTypes: {
    open: new ArgHelper().type("boolean").default("false").arg,
    action: new ArgHelper().options(["show", "hide", "toggle", "none"], "bottom").arg,
    position: new ArgHelper().options(
      [
        "center",
        "left",
        "left-top",
        "left-bottom",
        "right",
        "right-top",
        "right-bottom",
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
        "start",
        "start-start",
        "start-end",
        "end",
        "end-start",
        "end-end",
      ],
      "bottom",
    ).arg,
    span: new ArgHelper().options(["span", "spread", "isolated"], "span").arg,
  },
  args: {
    open: false,
    action: "show",
    position: "bottom",
    span: "span",
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Positions = {
  render: allPositions,
};
