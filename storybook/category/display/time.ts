import { attr } from "@godown/element";
import type { Time } from "godown";
import { html } from "lit";

export default (args: Pick<Time, "format" | "gap" | "timeout">) => {
  return html`
<godown-time ${attr(args)}></godown-time>
  `;
};
