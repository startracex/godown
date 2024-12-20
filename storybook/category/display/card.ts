import { attr } from "@godown/element/directives/attr.js";
import type { Card } from "godown";
import { html } from "lit";

export default (args: Pick<Card, "footer" | "header">) => {
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
