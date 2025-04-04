import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./alert";

export default {
  title: "feedback/Alert",
  component: "godown-alert",
  tags: ["autodocs"],
  render,
  argTypes: {
    color: new ArgHelper().options(
      [
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
      "blue",
    ).arg,
    variant: new ArgHelper().options([
      "blockquote",
      "dark",
    ], "dark").arg,
    title: new ArgHelper().type("string").arg,
    content: new ArgHelper().type("string").arg,
  },
  args: {
    color: "blue",
    variant: "dark",
    hideClose: false,
    title: "Title",
    content: "",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
