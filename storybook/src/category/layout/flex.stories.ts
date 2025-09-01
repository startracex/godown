import { html } from "lit";
import { attr, loop } from "@godown/element";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import type Flex from "godown/web-components/flex/component.js";

export default {
  title: "layout/Flex",
  component: "godown-flex",
  tags: ["autodocs"],
  argTypes: {
    vertical: new ArgHelper().type("boolean").default("false").arg,
    gap: new ArgHelper().type("string").arg,
    flexFlow: new ArgHelper().type("string").arg,
    content: new ArgHelper().type("string").arg,
    items: new ArgHelper().type("string").arg,
  },
  args: {
    vertical: false,
    gap: "1em",
  },
} as StoryMeta<Flex>;

type Story = StoryVariants<Flex>;

export const Primary: Story = {
  render: (args: Flex) => html`
    <godown-flex ${attr(args)}>
      ${[
        ...loop(
          5,
          () => html`
            <div style="width: 5em;height: 2em;background: gray;"></div>
          `,
        ),
      ]}
    </godown-flex>
  `,
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: Primary.render,
};
