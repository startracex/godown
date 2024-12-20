import { attr } from "@godown/element/directives/attr.js";
import type { Range } from "godown";
import { html } from "lit";

export default (args: Pick<Range, "vertical" | "value" | "name" | "max" | "min" | "step" | "disabled">) => {
  const excludeValue = { ...args, value: undefined };
  return html`
<godown-range ${attr(excludeValue)} .value=${args.value}></godown-range>
  `;
};
