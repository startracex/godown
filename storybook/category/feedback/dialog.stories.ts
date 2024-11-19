import { booleanArgs } from "../../args";
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
      table: {
        defaultValue: { summary: "center" },
        type: { summary: "string" },
      },
    },
    open: booleanArgs,
    modal: booleanArgs,
  },
  args: {
    open: false,
    modal: false,
    direction: "center",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
