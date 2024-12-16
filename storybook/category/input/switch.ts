import "godown/switch.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Switch, "checked" | "disabled" | "round">) => {
  return html`
<godown-switch ${attr(args)}></godown-switch>
  `;
};
