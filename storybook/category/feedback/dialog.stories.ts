import { RendererMeta } from "../../types";
import render from "./dialog";

export default {
  title: "feedback/Dialog",
  component: "godown-dialog",
  tags: ["autodocs"],
  render,
  argTypes: {
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
        "center",
      ],
    },
  },
  args: {
    open: false,
    modal: false,
    direction: "center",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
