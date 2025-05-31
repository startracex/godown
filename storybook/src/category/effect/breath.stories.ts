import { attr } from "@godown/element";
import type { Breath } from "godown";
import { html } from "lit";
import { ArgHelper } from "../../lib/args";
import type { StoryMeta, StoryVariants } from "../../lib/types";

export default {
  title: "effect/Breath",
  component: "godown-breath",
  tags: ["autodocs"],
  argTypes: {
    content: new ArgHelper().type("string").arg,
    duration: new ArgHelper().type("number").arg,
  },
  args: {
    content: "Deploy. Preview. Ship.",
    duration: 8000,
  },
} as StoryMeta<Breath>;

type Story = StoryVariants<Breath>;

export const Primary: Story = {
  render: (args: Breath) => {
    return html`<godown-breath ${attr(args)}>
  <!-- From a certain website slogan -->
</godown-breath>`;
  },
};
