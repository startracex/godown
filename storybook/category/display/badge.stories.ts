import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./badge";

export default {
  title: "display/Badge",
  component: "godown-badge",
  tags: ["autodocs"],
  render,
  argTypes: {
    content: new ArgHelper().type("string").arg,
    disabled: new ArgHelper().type("boolean").default("false").arg,
    round: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    disabled: false,
    round: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
