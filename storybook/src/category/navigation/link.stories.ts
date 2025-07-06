import { attr } from "@godown/element";
import type { Link } from "godown";
import { html } from "lit";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";

export default {
  title: "navigation/Link",
  component: "godown-link",
  tags: ["autodocs"],
  argTypes: {
    replace: new ArgHelper().type("boolean").default("false").arg,
    suppress: new ArgHelper().type("boolean").default("false").arg,
    type: new ArgHelper().options([
      "push",
      "replace",
      "normal",
      "auto",
    ]).arg,
  },
  args: {
    href: "/",
    type: "auto",
    suppress: false,
  },
} as StoryMeta<Link>;

type Story = StoryVariants<Link>;

export const Primary: Story = {
  render: (args: Link) => {
    return html`
<godown-link ${attr(args)}>
  <godown-button>
    Click to navigate to: ${args.href}
  </godown-button>
</godown-link>
<godown-card>
  <godown-router>
    <div slot="/">Strict match ( / => / )</div>
    <div slot="/:dynamic">Dynamic match ( ${args.href} => /:dynamic )</div>
    <div slot="/*wild_dynamic">Wild dynamic match ( ${args.href} => /*wild_dynamic )</div>
    <div>No slotted</div>
  </godown-router>
</godown-card>
When no &lt;godown-router&gt; is mounted, its behavior is the same as that of &lt;a&gt;.
`;
  },
};
