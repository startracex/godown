import { attr } from "@godown/element";
import type { Range } from "godown";
import { html } from "lit";

export default (args: Range) => {
  return html`
<godown-range ${attr(args)}></godown-range>
  `;
};
