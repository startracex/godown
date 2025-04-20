import type { Details } from "godown";
import { ArgHelper } from "../../args";
import type { StoryMeta, StoryVariants } from "../../types";
import { attr } from "@godown/element";
import { html } from "lit";

export default {
  title: "display/Details",
  component: "godown-details",
  tags: ["autodocs"],
  argTypes: {
    fill: new ArgHelper().type("boolean").default("false").arg,
    float: new ArgHelper().type("boolean").default("false").arg,
    summary: new ArgHelper().type("string").default("").arg,
    open: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    fill: false,
    float: false,
    summary: "Summary",
    open: false,
  },
} as StoryMeta<Details>;

type Story = StoryVariants<Details>;

export const Primary: Story = {
  render: (args: Details) =>
    html`
<godown-details ${attr(args)}>
  <div>Details expanded</div>
</godown-details>
  `,
};
