import "godown/layout.js";
import "./layout.css";

import { attr } from "@godown/element/directives/attr.js";
import type { Layout } from "godown";
import { html } from "lit";

export default (args: Pick<Layout, "noFooter" | "noHeader" | "sticky">) => {
  return html`
<div class="container">
  <godown-layout ${attr(args)}>
    <div slot="header">
      Header
    </div>
    <main>
      Main content
    </main>
    <div slot="footer">
      Footer
    </div>
  </godown-layout>
</div>`;
};
