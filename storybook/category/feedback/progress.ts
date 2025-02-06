import { attr } from "@godown/element";
import type { Progress } from "godown";
import { html } from "lit";

export default (args: Progress) => {
  return html`<godown-progress ${attr(args)}></godown-progress>`;
};
