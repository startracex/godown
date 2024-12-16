import "godown/skeleton.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Skeleton, "type" | "animation">) => {
  return html`<godown-skeleton ${attr(args)}></godown-skeleton>`;
};
