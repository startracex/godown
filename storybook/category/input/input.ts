import "godown/input.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Input, "type" | "variant" | "placeholder" | "name" | "disabled">) => {
  return html`
<godown-input ${attr(args)}></godown-input>
  `;
};
