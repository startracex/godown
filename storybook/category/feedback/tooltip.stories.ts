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
  },
  args: {
    tip: "Tooltip visible",
    propagation: false,
    align: "center",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
