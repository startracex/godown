import type { Skeleton } from "godown";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";

export default {
  title: "feedback/Skeleton",
  component: "godown-skeleton",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} as StoryMeta<Skeleton>;

type Story = StoryVariants<Skeleton>;

export const Primary: Story = {};
