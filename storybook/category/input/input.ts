import { attr } from "@godown/element";
import type { Input } from "godown";
import { html } from "lit";

export default (args: Input) => {
  return html`
<godown-input ${attr(args)}></godown-input>
  `;
};
