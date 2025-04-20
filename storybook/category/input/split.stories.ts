import type { Split } from "godown";
import { ArgHelper, ringTypeArgs } from "../../args";
import type { StoryMeta, StoryVariants } from "../../types";

export default {
  title: "input/Split",
  component: "godown-split",
  tags: ["autodocs"],
  argTypes: {
    disabled: new ArgHelper().type("boolean").default("false").arg,
    "ring-type": ringTypeArgs(),
    len: new ArgHelper().type("number").control("number", { min: 1 }).default("6").arg,
    index: new ArgHelper().type("number").default("-1").arg,
  },
  args: {
    len: 6,
    disabled: false,
    "ring-type": "border",
  },
} as StoryMeta<Split>;

type Story = StoryVariants<Split>;

export const Primary: Story = {};
