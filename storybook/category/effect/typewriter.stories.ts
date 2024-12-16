import { numberArg, stringArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./typewriter";

export default {
  title: "effect/Typewriter",
  component: "godown-typewriter",
  tags: ["autodocs"],
  render,
  argTypes: {
    text: stringArg,
    delay: numberArg,
  },
  args: {
    text: "Hello world",
    delay: 0,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
