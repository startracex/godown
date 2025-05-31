import { html } from "lit";
import { ArgHelper } from "../../lib/args";
import type { StoryMeta, StoryVariants } from "../../lib/types";
import { attr } from "@godown/element";
import type { Range } from "godown";

export default {
  title: "input/Range",
  component: "godown-range",
  tags: ["autodocs"],
  argTypes: {
    disabled: new ArgHelper().type("boolean").default("false").arg,
    step: new ArgHelper().type("number").default("1").arg,
    value: new ArgHelper().type("number | array").control("object").arg,
    vertical: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    disabled: false,
    max: 100,
    min: 0,
    value: [0, 50],
    vertical: false,
  },
} as StoryMeta<Range>;

type Story = StoryVariants<Range>;

export const Primary: Story = {
  render: (args: Range) =>
    html`
<godown-flex content=center items=center style="height: ${args.vertical ? "100%" : "auto"};">
  <godown-range ${attr(args)}></godown-range>
</godown-flex>
  `,
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: Primary.render,
};

export const SignalControl: Story = {
  args: {
    value: 70,
  },
  render: Primary.render,
};

export const MultipleControl: Story = {
  args: {
    value: [20, 40, 80, 90],
  },
  render: Primary.render,
};
