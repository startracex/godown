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
      table: {
        defaultValue: { summary: "black" },
        type: {
          summary: "string",
        },
      },
    },
    content: {
      control: "text",
    },
  },
  args: {
    color: "black",
    disabled: false,
    round: false,
    ghost: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Ghost = {
  args: {
    ghost: true,
  },
};

export const WithColor = {
  args: {
    color: "blue",
  },
};
