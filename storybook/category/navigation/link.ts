import { attr } from "@godown/element";
import type { Link } from "godown";
import { html } from "lit";

export default (args: Link) => {
  return html`
<godown-link ${attr(args)}>
 When no &lt;godown-router&gt; is mounted, its behavior is the same as that of &lt;a&gt;.
</godown-link>
`
};
