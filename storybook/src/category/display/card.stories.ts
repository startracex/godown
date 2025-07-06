import { attr } from "@godown/element";
import type { Card } from "godown";
import { html } from "lit";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";

export default {
  title: "display/Card",
  component: "godown-card",
  tags: ["autodocs"],
  argTypes: {
    header: new ArgHelper().type("boolean").default("false").arg,
    footer: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    header: false,
    footer: false,
  },
} as StoryMeta<Card>;

type Story = StoryVariants<Card>;

export const Primary: Story = {
  render: (args: Card) =>
    html`
<godown-card ${attr(args)}>
${[
      args.header
        ? html`
  <div slot="header">Header</div>
      `
        : "",
      html`
  <div>Main content</div>
  `,
      args.footer
        ? html`
  <div slot="footer">Footer</div>
      `
        : "",
    ]}
</godown-card>
    `,
};

export const WithHeader: Story = {
  args: {
    header: true,
  },
  render: Primary.render,
};

export const WithFooter: Story = {
  args: {
    footer: true,
  },
  render: Primary.render,
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: true,
    footer: true,
  },
  render: Primary.render,
};
