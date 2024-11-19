import "godown/router.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Router, "baseURL" | "pathname" | "type">) => {
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
