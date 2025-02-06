import { attr } from "@godown/element";
import type { Alert } from "godown";
import { html } from "lit";

export default (args: Alert) => {
  return html`<godown-alert ${attr(args)}>
  Alert content
</godown-alert>`;
};
