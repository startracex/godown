import { attr } from "@godown/element/directives/attr.js";
import type { Details } from "godown";
import { html } from "lit";

export default (args: Pick<Details, "open" | "summary">) => {
  return html`
<godown-details ${attr(args)}>
  <div>Details expanded</div>
</godown-details>
  `;
};
