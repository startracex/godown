import { attr } from "@godown/element/directives/attr.js";
import type { Range } from "godown";
import { html } from "lit";

export default (args: Pick<Range, "vertical" | "value" | "name" | "max" | "min" | "step" | "disabled">) => {
  return html`
<godown-range ${attr(args)}></godown-range>
  `;
};
