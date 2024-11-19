import "godown/card.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Card, "footer" | "header">) => {
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
