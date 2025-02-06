import { attr } from "@godown/element";
import type { Card } from "godown";
import { html } from "lit";

export default (args: Card) => {
  return html`
<godown-card ${attr(args)}>
  <div slot="header">
    Header
  </div>
  <div>
    Main content
  </div>
  <div slot="footer">
    Footer
  </div>
</godown-card>
  `;
};
