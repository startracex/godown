import { attr } from "@godown/element";
import type { Heading } from "godown";
import { html } from "lit";

export default (args: Pick<Heading, "id" | "as" | "anchor">) =>
  html`<div style="margin: 24px;">
  <godown-heading ${attr(args)}>Heading section as ${args.as}</godown-heading>
</div>
`;
