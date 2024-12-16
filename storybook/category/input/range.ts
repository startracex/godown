import "godown/range.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Range, "vertical" | "value" | "name" | "max" | "min" | "step" | "disabled">) => {
  const excludeValue = { ...args, value: undefined };
  return html`
<godown-range ${attr(excludeValue)} .value=${args.value}></godown-range>
  `;
};
