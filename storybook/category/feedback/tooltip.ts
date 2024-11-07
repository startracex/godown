import "godown/tooltip.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Tooltip, "tip" | "propagation" | "direction" | "align">) => {
  return html`<godown-tooltip ${attr(args)}>
  Hover me
</godown-tooltip>`;
};
