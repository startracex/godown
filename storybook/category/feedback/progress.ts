import "godown/progress.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Progress, "value" | "max" | "min">) => {
  return html`<godown-progress ${attr(args)}></godown-progress>`;
};
