import { attr } from "@godown/element";
import type { Alert } from "godown";
import { html } from "lit";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";

export default {
  title: "feedback/Alert",
  component: "godown-alert",
  tags: ["autodocs"],
  argTypes: {
    title: new ArgHelper().type("string").arg,
    content: new ArgHelper().type("string").arg,
  },
  args: {},
} as StoryMeta<Alert>;

type Story = StoryVariants<Alert>;

export const Primary: Story = {
  render: (args: Alert) => html`
    <godown-alert ${attr(args)}>
      <div slot="prefix">
        <iconify-icon
          icon="fluent:warning-20-regular"
          style="margin-inline-end: .5em;vertical-align: text-bottom;"
        ></iconify-icon>
      </div>
      <div slot="suffix">
        <iconify-icon
          icon="fluent:dismiss-20-regular"
          style="margin-inline-start: .5em;vertical-align: text-bottom;"
        ></iconify-icon>
      </div>
      <div slot="title">Alert title</div>
      <div>Alert content</div>
    </godown-alert>
  `,
};
