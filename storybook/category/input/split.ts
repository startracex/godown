import { attr } from "@godown/element/directives/attr.js";
import type { Split } from "godown";
import { html } from "lit";

export default (args: Pick<Split, "len" | "disabled">) => {
  return html`
<godown-split ${attr(args)}></godown-split>
  `;
};
