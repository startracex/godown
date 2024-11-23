import { ArgHelper } from "../../args";
import { RendererMeta } from "../../types";
import render from "./button";

export default {
  title: "input/Button",
  component: "godown-button",
  tags: ["autodocs"],
  render,
  argTypes: {
    color: new ArgHelper().options([
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
    ]).arg,
    content: new ArgHelper().type("string").control("text").arg,
  },
  args: {
    color: "black",
    disabled: false,
    round: false,
    ghost: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithColor = {
  args: {
    color: "blue",
  },
};

export const Ghost = {
  args: {
    ghost: true,
    color: "blue",
  },
};

export const WithCustomColor = {
  args: {
    style: "background: #3d4051; color: #e2e8f0;",
  },
};
