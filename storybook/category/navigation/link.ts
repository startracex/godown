import "godown/link.js";
import "godown/router.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Link, "href" | "type">) => {
  return html`
<godown-link ${attr(args)}>Go to ${args.href}</godown-link>
${
    args.type === "push" || args.type === "replace"
      ? html`<godown-router>
  <div slot="/index">Index Page, update pathname to navigation</div>
  <div slot="/:dynamic">Page other (dynamic match)</div>
  <div slot="/*wild_dynamic">Page other (wild dynamic match)</div>
  <div>No slotted</div>
</godown-router>`
      : ""
  }
  `;
};
