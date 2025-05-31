import type { Progress } from "godown";
import { ArgHelper } from "../../lib/args";
import type { StoryMeta, StoryVariants } from "../../lib/types";
import { html } from "lit";
import { attr } from "@godown/element";

export default {
  title: "feedback/Progress",
  component: "godown-progress",
  tags: ["autodocs"],
  argTypes: {
    value: new ArgHelper().type("number").control("number", {
      max: 100,
      min: 0,
    }).arg,
    max: new ArgHelper().type("number").default("100").arg,
    min: new ArgHelper().type("number").default("0").arg,
  },
  args: {
    max: 100,
    min: 0,
  },
} as StoryMeta<Progress>;

type Story = StoryVariants<Progress>;

export const Primary: Story = {};

export const WithValue: Story = {
  args: {
    value: 70,
  },
  render: Primary.render,
};
