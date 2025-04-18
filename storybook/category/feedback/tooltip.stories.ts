import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render, { allPositions as position } from "./tooltip";

export default {
  title: "feedback/Tooltip",
  component: "godown-tooltip",
  tags: ["autodocs"],
  render,
  argTypes: {
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
    span: new ArgHelper().options(["span", "isolated"], "span").arg,
    delay: new ArgHelper().control("number").arg,
  },
  args: {
    position: "bottom",
    span: "span",
    delay: 300,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Positions = {
  render: position,
};
