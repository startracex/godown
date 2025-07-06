import type { Divider } from "godown";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import { html } from "lit";
import { attr } from "@godown/element";

export default {
  title: "layout/Divider",
  component: "godown-divider",
  tags: ["autodocs"],
  argTypes: {
    vertical: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    vertical: false,
  },
} as StoryMeta<Divider>;

type Story = StoryVariants<Divider>;

export const Primary: Story = {
  render: (args: Divider) =>
    html`<godown-flex
  ?vertical="${!args.vertical}"
  content="space-evenly"
  items="center"
  style="height: 15em;"
>
  A
  <godown-divider ${attr(args)}></godown-divider>
  B
</godown-flex>
  `,
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: Primary.render,
};
