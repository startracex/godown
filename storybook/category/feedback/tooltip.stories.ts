import { ArgHelper, booleanArg } from "../../args";
import { RendererMeta } from "../../types";
import render from "./tooltip";

export default {
  title: "feedback/Tooltip",
  component: "godown-tooltip",
  tags: ["autodocs"],
  render,
  argTypes: {
    align: new ArgHelper().options([
      "center",
      "start",
      "end",
    ]).arg,
    direction: new ArgHelper().options([
      "left",
      "right",
      "top",
      "bottom",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
    ]).arg,
    propagation: booleanArg,
    type: new ArgHelper().options([
      "hover",
      "focus",
    ]).arg,
  },
  args: {
    align: "center",
    direction: "top",
    propagation: false,
    tip: "Tooltip visible",
    type: "hover",
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithDirection = {
  args: {
    direction: "bottom",
  },
};

export const WithPropagation = {
  args: {
    propagation: true,
  },
};

export const WithFocus = {
  args: {
    type: "focus",
  },
};

export const WithBackground = {
  args: {
    stylex: "--godown-tooltip--tip-background: #007cc7;",
  },
};
