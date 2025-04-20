import type { Input } from "godown";
import { ArgHelper, ringTypeArgs } from "../../args";
import type { StoryMeta, StoryVariants } from "../../types";

export default {
  title: "input/Input",
  component: "godown-input",
  tags: ["autodocs"],
  argTypes: {
    "ring-type": ringTypeArgs(),
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
    "ring-type": "border",
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
