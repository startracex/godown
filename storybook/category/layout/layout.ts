import { attr } from "@godown/element";
import type { Layout } from "godown";
import { html } from "lit";

export default (args: Layout) => {
  return html`
<div style="overflow-y: scroll;height: 20em;">
  <godown-layout ${attr(args)}>
    <header slot="header">
      Header (${args.sticky ? "sticky" : "static"})
    </header>
    <main>
      Main content
    </main>
    <footer slot="footer">
      Footer
    </footer>
  </godown-layout>
</div>`;
};
