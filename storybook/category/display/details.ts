import "godown/details.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Details, "open" | "summary">) => {
  return html`
<godown-details ${attr(args)}>
  <div>Details expanded</div>
</godown-details>
  `;
};
