import type Breath from "godown/web-components/breath/component.js";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta } from "../../lib/types.js";

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
