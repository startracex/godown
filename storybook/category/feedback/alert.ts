import "godown/alert.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Alert, "color" | "call" | "title" | "variant">) => {
  return html`<godown-alert ${attr(args)}>
  Alert content
</godown-alert>`;
};
