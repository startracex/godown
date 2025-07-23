import type { Badge } from "godown";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import { html } from "lit";
import { attr } from "@godown/element";

export default {
  title: "display/Badge",
  component: "godown-badge",
  tags: ["autodocs"],
  argTypes: {
    content: new ArgHelper().type("string").arg,
    disabled: new ArgHelper().type("boolean").default("false").arg,
    round: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    disabled: false,
    round: false,
  },
} as StoryMeta<Badge>;

type Story = StoryVariants<Badge>;

export const Primary: Story = {
  render: (args: Badge) => html`
    <godown-badge ${attr(args)}>Badge</godown-badge>
  `,
};
