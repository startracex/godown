import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./router";

export default {
  title: "navigation/Router",
  component: "godown-router",
  tags: ["autodocs"],
  render,
  argTypes: {
    pathname: new ArgHelper().type("string").default("").arg,
    type: new ArgHelper().options([
      "united",
      "slotted",
      "field",
    ]).arg,
    cache: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    pathname: "/index",
    type: "united",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
