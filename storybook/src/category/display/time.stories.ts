import type { Time } from "godown";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import { html } from "lit";
import { attr } from "@godown/element";

export default {
  title: "display/Time",
  component: "godown-time",
  tags: ["autodocs"],
  argTypes: {
    timeout: new ArgHelper().type("number").type("number").arg,
    time: new ArgHelper().type("Date").control("date").arg,
    gap: new ArgHelper().type("number").type("number").arg,
    escape: new ArgHelper().type("string").default("%").arg,
  },
  args: {
    format: "YYYY-MM-DD hh:mm:ss",
    timeout: 1000,
  },
} as StoryMeta<Time>;

type Story = StoryVariants<Time>;

export const Primary: Story = {
  render: (args: Time) => {
    if (args.time) {
      args.time = new Date(args.time);
    }
    return html`
<godown-time ${attr(args)}></godown-time>
  `;
  },
};

export const WithGap: Story = {
  args: {
    gap: -1000,
  },
};

export const WithFormat: Story = {
  args: {
    format: "YYYY-MM-DD",
  },
};
