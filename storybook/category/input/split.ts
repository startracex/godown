import "godown/split.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Split, "len" | "disabled">) => {
  return html`
<godown-split ${attr(args)}></godown-split>
  `;
};
