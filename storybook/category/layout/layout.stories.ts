import type { Layout } from "godown";
import { ArgHelper } from "../../args";
import type { StoryMeta, StoryVariants } from "../../types";
import { html } from "lit";
import { attr } from "@godown/element";

export default {
  title: "layout/Layout",
  component: "godown-layout",
  tags: ["autodocs"],
  argTypes: {
    sticky: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    sticky: false,
  },
} as StoryMeta<Layout>;

type Story = StoryVariants<Layout>;

export const Primary: Story = {
  render: (args: Layout) => {
    return html`
<div style="overflow-y: scroll;height: 20em;">
  <godown-layout ${attr(args)}>
    <header slot="header">
      Header (${args.sticky ? "sticky" : "static"})
    </header>
    <main>
      Main content
    </main>
    <footer slot="footer">
      Footer
    </footer>
  </godown-layout>
</div>`;
  },
};

export const Sticky: Story = {
  args: {
    sticky: true,
  },
  render: Primary.render,
};
