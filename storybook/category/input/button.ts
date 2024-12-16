import "godown/button.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Button, "color" | "disabled" | "round" | "ghost" | "content" | "disabled">) => {
  return html`
<godown-button ${attr(args)}> Click me </godown-button>
  `;
};
