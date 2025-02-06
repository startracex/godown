import { attr } from "@godown/element";
import type { Details } from "godown";
import { html } from "lit";

export default (args: Details) => {
  return html`
<godown-details ${attr(args)}>
  <div>Details expanded</div>
</godown-details>
  `;
};
