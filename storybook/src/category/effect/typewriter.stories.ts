import type { Breath, Typewriter } from "godown";
import { ArgHelper } from "../../lib/args";
import type { StoryMeta } from "../../lib/types";
import { attr } from "@godown/element";
import { html } from "lit";

export default {
  title: "effect/Typewriter",
  component: "godown-typewriter",
  tags: ["autodocs"],
  argTypes: {
    content: new ArgHelper().type("string").default("").arg,
    delay: new ArgHelper().type("number").default("0").arg,
  },
  args: {
    content: "Hello world",
    delay: 0,
  },
} as StoryMeta<Breath>;

export const Primary = {};
