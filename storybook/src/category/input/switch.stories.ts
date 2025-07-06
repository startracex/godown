import type { Switch } from "godown";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";

export default {
  title: "input/Switch",
  component: "godown-switch",
  tags: ["autodocs"],
  argTypes: {
    value: new ArgHelper().type("boolean").default("false").arg,
    disabled: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    value: false,
    disabled: false,
  },
} as StoryMeta<Switch>;

type Story = StoryVariants<Switch>;

export const Primary: Story = {};

export const WithCustomSize: Story = {
  args: {
    stylex: "--godown-switch-handle-size: 1.55em;",
  },
};

export const WithCustomColor = {
  args: {
    stylex: "background: blueviolet;--godown--active: darkorange;",
  },
};
