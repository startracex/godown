import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./alert";

export default {
  title: "feedback/Alert",
  component: "godown-alert",
  tags: ["autodocs"],
  render,
  argTypes: {
    variant: new ArgHelper().options([
      "blockquote",
      "dark",
    ], "dark").arg,
    title: new ArgHelper().type("string").arg,
    content: new ArgHelper().type("string").arg,
  },
  args: {
    variant: "dark",
    title: "Title",
    content: "",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
