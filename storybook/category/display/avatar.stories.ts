import { ArgHelper } from "../../args";
import type { StoryMeta, StoryVariants } from "../../types";
import { html } from "lit";
import { attr } from "@godown/element";
import type { Avatar } from "godown";

export default {
  title: "display/Avatar",
  component: "godown-avatar",
  tags: ["autodocs"],
  argTypes: {
    name: new ArgHelper().type("string").default("").arg,
    round: new ArgHelper().type("boolean").default("false").arg,
    src: new ArgHelper().type("string").arg,
  },
  args: {
    name: "S",
    round: false,
  },
} as StoryMeta<Avatar>;

type Story = StoryVariants<Avatar>;

export const Primary: Story = {};

export const WithSrc: Story = {
  args: {
    src: "https://picsum.photos/40",
  },
};
