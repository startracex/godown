import "godown/text.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Text, "underline" | "clip">) => {
  return html`
<godown-text ${attr(args)}>
  <div> Reason has always existed, but not always in a reasonable form. </div>
</godown-text>
  `;
};
