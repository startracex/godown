import { attr } from "@godown/element";
import type { Typewriter } from "godown";
import { html } from "lit";

export default (args: Typewriter) => {
  return html`<godown-typewriter ${attr(args)}></godown-typewriter>`;
};
