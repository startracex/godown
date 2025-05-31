import { html } from "lit";
import { ArgHelper } from "../../lib/args";
import type { StoryMeta, StoryVariants } from "../../lib/types";
import { attr } from "@godown/element";
import type { Text } from "godown";

export default {
  title: "display/Text",
  component: "godown-text",
  tags: ["autodocs"],
  argTypes: {
    underline: new ArgHelper().options(["none", "hover", "active", "always"]).arg,
    clip: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    underline: "none",
    clip: false,
    nowrap: false,
    italic: false,
    truncate: false,
  },
} as StoryMeta<Text>;

type Story = StoryVariants<Text>;

export const Primary: Story = {
  render: (args: Text) =>
    html`
<godown-text ${attr(args)}>

  <div>
    Reason has always existed, but not always in a reasonable form. 
    <!-- From a certain communist -->
  </div>

</godown-text>
  `,
};
