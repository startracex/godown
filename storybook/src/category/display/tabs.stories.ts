import type { Tabs } from "godown";
import { ringTypeAttribute } from "godown/internal/ring.js";
import { ArgHelper, ringTypeArgs } from "../../lib/args.js";
import { html } from "lit";
import { attr } from "@godown/element";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";

export default {
  title: "display/Tabs",
  component: "godown-tabs",
  tags: ["autodocs"],
  argTypes: {
    index: new ArgHelper().type("number").default("0").arg,
    indicator: new ArgHelper().options(["background", "underline"]).arg,
    beginning: new ArgHelper().options(["selected", "previous", "none"]).arg,
    tabs: new ArgHelper().type("string[]").arg,
    [ringTypeAttribute]: ringTypeArgs(),
  },
  args: {
    index: 0,
    indicator: "background",
    beginning: "selected",
    tabs: ["Tab 1", "Tab 2", "Tab 3"],
    [ringTypeAttribute]: "border",
  },
} as StoryMeta<Tabs>;

type Story = StoryVariants<Tabs>;

export const Primary: Story = {
  render: (args: Tabs) => html`
    <godown-tabs ${attr(args)}></godown-tabs>
  `,
};

export const Slotted: Story = {
  render: (args: Tabs) => html`
    <godown-tabs ${attr(args)}>
      ${args.tabs.map(
        (tab) => html`
          <div
            slot="${tab}"
            style="padding: 0 .5em;white-space: nowrap;"
          >
            Slot ${tab}
          </div>
        `,
      )}
    </godown-tabs>
  `,
};

export const Indicator: Story = {
  render: (args: Tabs) => html`
    <godown-flex
      gap=".5em"
      vertical
    >
      ${["background", "underline"].map(
        (indicator) => html`
          <godown-tabs ${attr({ ...args, indicator })}></godown-tabs>
        `,
      )}
    </godown-flex>
  `,
};

export const Beginning: Story = {
  render: (args: Tabs) => html`
    <godown-flex
      gap=".5em"
      vertical
    >
      ${["selected", "previous", "none"].map(
        (beginning) => html`
          <godown-tabs ${attr({ ...args, beginning })}></godown-tabs>
        `,
      )}
    </godown-flex>
  `,
};

export const Vertical: Story = {
  args: {
    stylex: "flex-direction: column;",
  },
  render: Primary.render,
};
