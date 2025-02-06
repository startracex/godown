import { attr } from "@godown/element";
import type { Button } from "godown";
import { html } from "lit";

export default (args: Pick<Button, "color" | "disabled" | "round" | "ghost" | "content" | "disabled">) => {
  return html`
<godown-button ${attr(args)}> Click me </godown-button>
  `;
};
