import { attr } from "@godown/element/directives/attr.js";
import type { Input } from "godown";
import { html } from "lit";

export default (args: Pick<Input, "type" | "variant" | "placeholder" | "name" | "disabled">) => {
  return html`
<godown-input ${attr(args)}></godown-input>
  `;
};
