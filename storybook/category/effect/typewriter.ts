import { attr } from "@godown/element/directives/attr.js";
import type { Typewriter } from "godown";
import { html } from "lit";

export default (args: Pick<Typewriter, "text" | "delay">) => {
  return html`<godown-typewriter ${attr(args)}></godown-typewriter>`;
};
