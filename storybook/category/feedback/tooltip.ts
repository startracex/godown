import "godown/tooltip.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Tooltip, "tip" | "propagation" | "direction" | "align" | "type">) => {
  return html`<godown-tooltip ${attr(args)}>
  ${args.type === "hover" ? "Hover" : "Click"} me
</godown-tooltip>`;
};
