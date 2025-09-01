import { html } from "lit";
import { attr } from "@godown/element";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import type Layout from "godown/web-components/layout/component.js";

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
          <header
            slot="header"
            style="padding: 1em 0;text-align: center;border-bottom: dotted 2px gray;"
          >
            Header (${args.sticky ? "sticky" : "static"})
          </header>
          <main style="height: 100%;display: grid;place-items: center;min-height: 30em;">Main content</main>
          <footer
            slot="footer"
            style="padding: 1em 0;text-align: center;border-top: dotted 2px gray;"
          >
            Footer
          </footer>
        </godown-layout>
      </div>
    `;
  },
};

export const Sticky: Story = {
  args: {
    sticky: true,
  },
  render: Primary.render,
};
