import type { Select } from "godown";
import { ArgHelper, ringTypeArgs } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import { html } from "lit";
import { attr } from "@godown/element";
import { ringTypeAttribute } from "godown/internal/ring.js";

export default {
  title: "input/Select",
  component: "godown-select",
  tags: ["autodocs"],
  argTypes: {
    disabled: new ArgHelper().type("boolean").default("false").arg,
    [ringTypeAttribute]: ringTypeArgs(),
    placeholder: new ArgHelper().type("string").arg,
    multiple: new ArgHelper().type("boolean").default("false").arg,
    noEdit: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    disabled: false,
    multiple: false,
    noEdit: false,
    [ringTypeAttribute]: "border",
  },
} as StoryMeta<Select>;

type Story = StoryVariants<Select>;

export const Primary: Story = {
  render: (args: Select) => {
    return html`
<godown-select ${
      attr({
        ...args,
        placeholder: args.placeholder || "Choose a food",
      })
    }>
  <godown-card style="margin-top: .2em;">
    <optgroup label="Fruit">
      <option value="apple">Apples</option>
      <option value="banana">Bananas</option>
      <option value="cherry">Cherries</option>
      <option value="damson">Damsons</option>
    </optgroup>
    <hr />
    <optgroup label="Vegetables">
      <option value="artichoke">Artichokes</option>
      <option value="broccoli">Broccoli</option>
      <option value="cabbage">Cabbages</option>
    </optgroup>
  </godown-card>
</godown-select>
  `;
  },
};

export const Dropdown: Story = {
  args: {
    noEdit: true,
    multiple: true,
  },
  render: Primary.render,
};
