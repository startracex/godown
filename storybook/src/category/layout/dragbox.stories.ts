import type { Dragbox } from "godown";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import { html } from "lit";
import { attr } from "@godown/element";

export default {
  title: "layout/Dragbox",
  component: "godown-dragbox",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} as StoryMeta<Dragbox>;

type Story = StoryVariants<Dragbox>;

export const Primary: Story = {
  render: (args: Dragbox) =>
    html`
<div style="position: relative;height: 12em;outline: 2px gray dashed;">
  <godown-dragbox ${attr(args)}>
    <div style="width: 4em; height: 4em; background: gray;"></div>
  </godown-dragbox>
</div>
  `,
};
