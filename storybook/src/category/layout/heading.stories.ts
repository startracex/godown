import { html } from "lit";
import { attr } from "@godown/element";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import type Heading from "godown/web-components/heading/component.js";

export default {
  title: "layout/Heading",
  component: "godown-heading",
  tags: ["autodocs"],
  argTypes: {
    as: new ArgHelper().options(["h1", "h2", "h3", "h4", "h5", "h6"]).arg,
    anchor: new ArgHelper().type("string").default("#").arg,
    side: new ArgHelper().options(["left", "right"]).arg,
    href: new ArgHelper().type("string").arg,
  },
  args: {
    as: "h2",
    anchor: "#",
    side: "left",
  },
} as StoryMeta<Heading>;

type Story = StoryVariants<Heading>;

export const Primary: Story = {
  render: (args: Heading) => html`
    <div style="margin: 24px;">
      <godown-heading ${attr(args)}>Heading section as ${args.as}</godown-heading>
    </div>
  `,
};

export const WithID = {
  args: {
    id: "test",
  },
  render: Primary.render,
};
