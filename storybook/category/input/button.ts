import "godown/button.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Button, "color" | "disabled" | "round" | "ghost" | "text" | "disabled">) => {
  return html`
<godown-button ${attr(args)}> Click me </godown-button>
  `;
};
