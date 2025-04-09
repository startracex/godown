import "./layout.css";

import { attr } from "@godown/element";
import type { Layout } from "godown";
import { html } from "lit";

export default (args: Layout) => {
  return html`
<div class="container">
  <godown-layout ${attr(args)}>
    <div slot="header">
      Header (${args.sticky? "sticky" : "static"})
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
