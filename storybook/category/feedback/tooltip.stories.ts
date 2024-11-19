import { RendererMeta } from "../../types";
import render from "./tooltip";

export default {
  title: "feedback/Tooltip",
  component: "godown-tooltip",
  tags: ["autodocs"],
  render,
  argTypes: {
    align: {
      control: "select",
      options: [
        "center",
        "start",
        "end",
      ],
    },
    direction: {
      control: "select",
      options: [
        "left",
        "right",
        "top",
        "bottom",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
    },
    type: {
      control: "select",
      options: [
        "hover",
        "focus",
      ],
    },
  },
  args: {
    tip: "Tooltip visible",
    propagation: false,
    align: "center",
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
    style: "--godown-tooltip--tip-background: rgb(102 55 0);",
  },
};
