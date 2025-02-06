import { attr } from "@godown/element";
import type { Skeleton } from "godown";
import { html } from "lit";

export default (args: Skeleton) => {
  return html`<godown-skeleton ${attr(args)}></godown-skeleton>`;
};
