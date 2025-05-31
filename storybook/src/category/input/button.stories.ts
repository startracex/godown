import { html } from "lit";
import { ArgHelper } from "../../lib/args";
import type { StoryMeta, StoryVariants } from "../../lib/types";
import { attr } from "@godown/element";
import type { Button } from "godown";

export default {
  title: "input/Button",
  component: "godown-button",
  tags: ["autodocs"],
  argTypes: {
    content: new ArgHelper().type("string").arg,
    disabled: new ArgHelper().type("boolean").default("false").arg,
    round: new ArgHelper().type("boolean").default("false").arg,
    plain: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    disabled: false,
    round: false,
    plain: false,
  },
} as StoryMeta<Button>;

type Story = StoryVariants<Button>;

export const Primary: Story = {
  render: (args: Button) =>
    html`
<godown-button ${attr(args)}>Click me</godown-button>
  `,
};

export const WithCustomColor: Story = {
  args: {
    stylex: "background: #a41515; color: #ffffff;",
  },
  render: Primary.render,
};

export const Sharps: Story = {
  render: () =>
    html`
<godown-flex gap=".5em">
  <godown-button style="width: 2em;height: 2em;">
    <iconify-icon icon="ion:logo-web-component"></iconify-icon>
  </godown-button>
  <godown-button style="width: 2em;height: 2em;" round>
    <iconify-icon icon="ion:logo-web-component"></iconify-icon>
  </godown-button>
</godown-flex>
  `,
};
