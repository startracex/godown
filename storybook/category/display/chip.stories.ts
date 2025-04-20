import { html } from "lit";
import { ArgHelper } from "../../args";
import { attr } from "@godown/element";
import type { Chip } from "godown";
import type { StoryMeta, StoryVariants } from "../../types";

export default {
  title: "display/Chip",
  component: "godown-chip",
  tags: ["autodocs"],
  argTypes: {
    position: new ArgHelper().options(["top-right", "top-left", "bottom-right", "bottom-left"]).arg,
    dot: new ArgHelper().type("boolean").type("boolean").arg,
    value: new ArgHelper().type("number").arg,
    max: new ArgHelper().type("number").arg,
  },
} as StoryMeta<Chip>;

type Story = StoryVariants<Chip>;

export const Primary: Story = {
  args: {
    dot: false,
    value: 5,
  },
  render: (args: Chip) =>
    html`
<godown-chip ${attr(args)}>
  ${args.position || "top-right"} ${args.dot ? "with dot" : ""}
</godown-chip> `,
};

export const Dot: Story = {
  args: {
    dot: true,
  },
  render: Primary.render,
};

export const WithMax: Story = {
  args: {
    value: 150,
    max: 99,
  },
  render: Primary.render,
};

export const WithCustomColor: Story = {
  args: {
    dot: true,
    stylex: "--godown--primary: #12a1a1;",
  },
  render: Primary.render,
};

export const WithOffset: Story = {
  args: {
    dot: true,
    stylex: "--godown-chip--offset: 12.5%;",
  },
  render: (args: Chip) =>
    html`<godown-chip ${attr(args)}>
    <godown-avatar name="S" round stylex="background-color: #12a1a1;"></godown-avatar>
  </godown-chip> `,
};
