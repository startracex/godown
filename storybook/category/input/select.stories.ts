import { RendererMeta } from "../../types";
import render from "./select";

export default {
  title: "input/Select",
  component: "godown-select",
  tags: ["autodocs"],
  render,
  argTypes: {
    direction: {
      control: "select",
      options: [
        "top",
        "bottom",
      ],
    },
  },
  args: {
    disabled: false,
    multiple: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
