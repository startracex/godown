import { attr } from "@godown/element";
import type { Alert } from "godown";
import { html } from "lit";
import { ArgHelper } from "../../args";
import type { StoryMeta, StoryVariants } from "../../types";

export default {
  title: "feedback/Alert",
  component: "godown-alert",
  tags: ["autodocs"],
  argTypes: {
    title: new ArgHelper().type("string").arg,
    content: new ArgHelper().type("string").arg,
  },
  args: {
    title: "Title",
    content: "",
  },
} as StoryMeta<Alert>;

type Story = StoryVariants<Alert>;

export const Primary: Story = {
  render: (args: Alert) =>
    html`<godown-alert ${attr(args)}>
  Alert content
</godown-alert>`,
};
