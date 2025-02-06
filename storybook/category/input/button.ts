import { attr } from "@godown/element";
import type { Button } from "godown";
import { html } from "lit";

export default (args: Button) => {
  return html`
<godown-button ${attr(args)}> Click me </godown-button>
  `;
};
