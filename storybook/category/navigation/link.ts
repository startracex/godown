import { attr } from "@godown/element";
import type { Link } from "godown";
import { html } from "lit";

export default (args: Link) => {
  return html`
<godown-link ${attr(args)}>
  <godown-button>
    Click to navigate to: ${args.href}
  </godown-button>
</godown-link>
<godown-card>
  <godown-router>
    <div slot="/">Strict match ( / => / )</div>
    <div slot="/:dynamic">Dynamic match ( ${args.href} => /:dynamic )</div>
    <div slot="/*wild_dynamic">Wild dynamic match ( ${args.href} => /*wild_dynamic )</div>
    <div>No slotted</div>
  </godown-router>
</godown-card>
When no &lt;godown-router&gt; is mounted, its behavior is the same as that of &lt;a&gt;.
`;
};
