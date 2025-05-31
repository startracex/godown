import type { Input } from "godown";
import { ArgHelper, ringTypeArgs } from "../../lib/args";
import type { StoryMeta, StoryVariants } from "../../lib/types";
import { ringTypeAttribute } from "godown/internal/ring";

export default {
  title: "input/Input",
  component: "godown-input",
  tags: ["autodocs"],
  argTypes: {
    [ringTypeAttribute]: ringTypeArgs(),
    type: new ArgHelper().options([
      "text",
      "search",
      "tel",
      "url",
      "email",
      "password",
      "number",
      "date",
      "time",
      "datetime-local",
      "month",
      "week",
    ]).arg,
    variant: new ArgHelper().options([
      "default",
      "outline",
    ]).arg,
    placeholder: new ArgHelper().type("string").arg,
  },
  args: {
    [ringTypeAttribute]: "border",
    type: "text",
    variant: "default",
  },
} as StoryMeta<Input>;

type Story = StoryVariants<Input>;

export const Primary: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Input placeholder",
  },
};

export const WithType: Story = {
  args: {
    type: "password",
  },
};

export const WithOutlineVariant: Story = {
  args: {
    variant: "outline",
  },
};

export const WithCustomColor: Story = {
  args: {
    stylex: "background: #131410; color: #ffffff; --godown--active: #2283ff",
  },
};
