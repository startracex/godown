import "godown/time.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

export default (args) => {
  return html`
<godown-time ${attr(args)}></godown-time>
  `;
};
