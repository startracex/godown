import { attr } from "@godown/element";
import type { Breath } from "godown";
import { html } from "lit";

export default (args: Breath) => {
  return html`<godown-breath ${attr(args)}>
  <!-- From a certain website slogan -->
</godown-breath>`;
};
