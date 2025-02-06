import { attr } from "@godown/element";
import type { Router } from "godown";
import { html } from "lit";

export default (args: Router) => {
  return html`
  Current pathname: ${args.pathname}
<godown-router ${attr(args)}>
  <div slot="/index">Index Page, update pathname to navigation</div>
  <div slot="/:dynamic">Page other (dynamic match)</div>
  <div slot="/*wild_dynamic">Page other (wild dynamic match)</div>
  <div>No slotted</div>
</godown-router>
  `;
};
