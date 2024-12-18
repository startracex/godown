import "godown/heading";

import { attr } from "@godown/element/directives/attr";
import { html, nothing } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Heading, "id" | "as" | "anchor">) =>
  html`
<godown-heading id=${args.id || nothing} ${attr(args)}>Heading section as ${args.as}</godown-heading>
`;
