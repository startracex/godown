import "godown/heading";

import { attr } from "@godown/element/directives/attr.js";
import type { Heading } from "godown";
import { html, nothing } from "lit";

export default (args: Pick<Heading, "id" | "as" | "anchor">) =>
  html`<div style="margin: 24px;">
  <godown-heading id=${args.id || nothing} ${attr(args)}>Heading section as ${args.as}</godown-heading>
</div>
`;
