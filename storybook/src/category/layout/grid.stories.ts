import type { Grid } from "godown";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import { attr, loop } from "@godown/element";
import { html } from "lit";

export default {
  title: "layout/Grid",
  component: "godown-grid",
  tags: ["autodocs"],
  argTypes: {
    columns: new ArgHelper().type("string | number").control("number").arg,
    content: new ArgHelper().type("string").arg,
    gap: new ArgHelper().type("string").arg,
    flexFlow: new ArgHelper().type("string").arg,
    items: new ArgHelper().type("string").arg,
    rows: new ArgHelper().type("string | number").control("number").arg,
  },
  args: {
    columns: 4,
    rows: 3,
    gap: "1em",
  },
} as StoryMeta<Grid>;

type Story = StoryVariants<Grid>;

export const Primary: Story = {
  render: (args: Grid) => html`
    <godown-grid ${attr(args)}>
      ${[
        ...loop(
          12,
          () => html`
            <div style="width: 5em;height: 2em;background: gray;"></div>
          `,
        ),
      ]}
    </godown-grid>
  `,
};
