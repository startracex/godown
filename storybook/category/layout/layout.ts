import "godown/layout.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Layout, "noFooter" | "noHeader" | "sticky">) => {
  return html`
<div style="height: 200px;overflow-y: scroll;">
  <godown-layout ${attr(args)} style="height: 300px;">
    <div slot="header">
      Header
    </div>
    <div>
      main content
    </div>
    <div slot="footer">
      Footer
    </div>
  </godown-layout>
</div>`;
};
