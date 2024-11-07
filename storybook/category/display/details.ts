import "godown/details.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

export default (args) => {
  return html`
<godown-details ${attr(args)}>
  <div>Details expanded</div>
</godown-details>
  `;
};
