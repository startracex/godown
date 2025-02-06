import { attr } from "@godown/element";
import type { Tooltip } from "godown";
import { html } from "lit";

export default (args: Pick<Tooltip, "tip" | "propagation" | "direction" | "align" | "type">) => {
  return html`<godown-tooltip ${attr(args)}>
  ${args.type === "hover" ? "Hover" : "Click"} me
</godown-tooltip>`;
};
