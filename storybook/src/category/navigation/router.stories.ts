import { attr } from "@godown/element";
import type { Router } from "godown";
import { html } from "lit";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";

export default {
  title: "navigation/Router",
  component: "godown-router",
  tags: ["autodocs"],
  argTypes: {
    pathname: new ArgHelper().type("string").default("").arg,
    type: new ArgHelper().options([
      //
      "united",
      "slotted",
      "field",
    ]).arg,
    cache: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    pathname: "/",
    type: "united",
  },
} as StoryMeta<Router>;

type Story = StoryVariants<Router>;

export const Primary: Story = {
  render: (args: Router) => html`
    Current pathname: ${args.pathname}
    <godown-card>
      <godown-router ${attr(args)}>
        <div slot="/">Strict match ( / => / )</div>
        <div slot="/:dynamic">Dynamic match ( ${args.pathname} => /:dynamic )</div>
        <div slot="/*wild_dynamic">Wild dynamic match ( ${args.pathname} => /*wild_dynamic )</div>
        <div>No slotted</div>
      </godown-router>
    </godown-card>
  `,
};
