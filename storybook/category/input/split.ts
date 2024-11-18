import "godown/split.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Split, "len" | "disabled">) => {
  args.len = args.len > 0 ? args.len : 1;
  return html`
<godown-split ${attr(args)}></godown-split>
  `;
};
