import { attr } from "@godown/element/directives/attr.js";
import type { Switch } from "godown";
import { html } from "lit";

export default (args: Pick<Switch, "checked" | "disabled" | "round">) => {
  return html`
<godown-switch ${attr(args)}></godown-switch>
  `;
};
