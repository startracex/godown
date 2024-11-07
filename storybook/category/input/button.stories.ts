import { RendererMeta } from "../../types";
import render from "./button";

export default {
  title: "input/Button",
  component: "godown-button",
  tags: ["autodocs"],
  render,
  argTypes: {
    color: {
      control: "select",
      options: [
        "teal",
        "blue",
        "green",
        "red",
        "purple",
        "orange",
        "yellow",
        "pink",
        "black",
        "gray",
        "white",
        "none",
      ],
    },
  },
  args: {
    color: "black",
    disabled: false,
    round: false,
    ghost: false,
    text: "",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
