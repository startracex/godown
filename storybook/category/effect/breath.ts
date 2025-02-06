import { attr } from "@godown/element/directives/attr.js";
import type { Breath } from "godown";
import { html } from "lit";

export default (args: Pick<Breath, "content" | "duration">) => {
  return html`<godown-breath ${attr(args)}>
  <!-- From a certain website slogan -->
</godown-breath>`;
};
