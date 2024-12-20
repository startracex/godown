import { attr } from "@godown/element/directives/attr.js";
import type { Progress } from "godown";
import { html } from "lit";

export default (args: Pick<Progress, "value" | "max" | "min">) => {
  return html`<godown-progress ${attr(args)}></godown-progress>`;
};
