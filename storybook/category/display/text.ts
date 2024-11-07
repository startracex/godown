import "godown/text.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

export default (args) => {
  return html`
<godown-text ${attr(args)}>
  <div> Reason has always existed, but not always in a reasonable form. </div>
</godown-text>
  `;
};
