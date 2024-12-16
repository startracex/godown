import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./link";

export default {
  title: "navigation/Link",
  component: "godown-link",
  tags: ["autodocs"],
  render,
  argTypes: {
    type: new ArgHelper().options([
      "push",
      "replace",
      "normal",
    ]).arg,
  },
  args: {
    href: "/index",
    type: "normal",
    suppress: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
