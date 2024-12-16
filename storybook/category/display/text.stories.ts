import { ArgHelper, booleanArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./text";

export default {
  title: "display/Text",
  component: "godown-text",
  tags: ["autodocs"],
  render,
  argTypes: {
    underline: new ArgHelper().options(["none", "hover", "active", "always"]).arg,
    clip: booleanArg,
  },
  args: {
    underline: "none",
    clip: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
