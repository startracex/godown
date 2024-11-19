import { numberArgs, stringArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./typewriter";

export default {
  title: "effect/Typewriter",
  component: "godown-typewriter",
  tags: ["autodocs"],
  render,
  argTypes: {
    text: stringArgs,
    delay: numberArgs,
  },
  args: {
    text: "Hello world",
    delay: 0,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
