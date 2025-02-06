import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./text";

export default {
  title: "display/Text",
  component: "godown-text",
  tags: ["autodocs"],
  render,
  argTypes: {
    underline: new ArgHelper().options(["none", "hover", "active", "always"]).arg,
    clip: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    underline: "none",
    clip: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
