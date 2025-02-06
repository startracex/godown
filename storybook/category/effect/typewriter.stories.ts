import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./typewriter";

export default {
  title: "effect/Typewriter",
  component: "godown-typewriter",
  tags: ["autodocs"],
  render,
  argTypes: {
    content: new ArgHelper().type("string").default("").arg,
    delay: new ArgHelper().type("number").default("0").arg,
  },
  args: {
    content: "Hello world",
    delay: 0,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
