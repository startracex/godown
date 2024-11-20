import { ArgHelper, booleanArg } from "../../args";
import { RendererMeta } from "../../types";
import render from "./alert";

export default {
  title: "feedback/Alert",
  component: "godown-alert",
  tags: ["autodocs"],
  render,
  argTypes: {
    call: new ArgHelper().options([
      "tip",
      "success",
      "info",
      "warning",
      "danger",
      "error",
      "help",
      "deprecated",
    ], null).arg,
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
      "light",
    ], "dark").arg,
    hideClose: booleanArg,
  },
  args: {
    color: "blue",
    variant: "dark",
    content: "",
    hideClose: false,
    title: "Title",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
