import "godown/time.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Time, "format" | "gap" | "timeout">) => {
  return html`
<godown-time ${attr(args)}></godown-time>
  `;
};
