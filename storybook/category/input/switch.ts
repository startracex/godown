import { attr } from "@godown/element";
import type { Switch } from "godown";
import { html } from "lit";

export default (args: Pick<Switch, "value" | "disabled" | "round">) => {
  return html`
<godown-switch ${attr(args)} ?checked=${args.value}></godown-switch>
  `;
};
