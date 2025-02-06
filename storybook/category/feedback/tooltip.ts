import { attr } from "@godown/element";
import type { Tooltip } from "godown";
import { html } from "lit";

export default (args: Tooltip) => {
  return html`<godown-tooltip ${attr(args)}>
  ${args.type === "hover" ? "Hover" : "Click"} me
</godown-tooltip>`;
};
