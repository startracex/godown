import "godown/switch.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

export default (args) => {
  return html`
<godown-switch ${attr(args)}></godown-switch>
  `;
};
