import { attr } from "@godown/element/directives/attr.js";
import type { Skeleton } from "godown";
import { html } from "lit";

export default (args: Pick<Skeleton, "type" | "animation">) => {
  return html`<godown-skeleton ${attr(args)}></godown-skeleton>`;
};
