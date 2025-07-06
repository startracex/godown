import type { Split } from "godown";
import { ArgHelper, ringTypeArgs } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import { ringTypeAttribute } from "godown/internal/ring.js";

export default {
  title: "input/Split",
  component: "godown-split",
  tags: ["autodocs"],
  argTypes: {
    disabled: new ArgHelper().type("boolean").default("false").arg,
    [ringTypeAttribute]: ringTypeArgs(),
    len: new ArgHelper().type("number").control("number", { min: 1 }).default("6").arg,
    index: new ArgHelper().type("number").default("-1").arg,
  },
  args: {
    len: 6,
    disabled: false,
    [ringTypeAttribute]: "border",
  },
} as StoryMeta<Split>;

type Story = StoryVariants<Split>;

export const Primary: Story = {};
