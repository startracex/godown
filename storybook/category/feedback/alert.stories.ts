import { RendererMeta } from "../../types";
import render from "./alert";

export default {
  title: "feedback/Alert",
  component: "godown-alert",
  tags: ["autodocs"],
  render,
  argTypes: {
    color: {
      control: "select",
      options: [
        "white",
        "black",
        "gray",
        "green",
        "teal",
        "blue",
        "red",
        "purple",
        "orange",
        "yellow",
        "pink",
        "none",
      ],
    },
    variant: {
      control: "select",
      options: [
        "blockquote",
        "dark",
        "light",
      ],
    },
    call: {
      control: "select",
      options: [
        "tip",
        "success",
        "info",
        "warning",
        "danger",
        "error",
        "help",
        "deprecated",
      ],
    },
  },
  args: {
    color: "blue",
    hideClose: false,
    title: "Title",
    content: "",
    variant: "dark",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
