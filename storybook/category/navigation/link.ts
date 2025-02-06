import { attr } from "@godown/element";
import type { Link } from "godown";
import { html } from "lit";

export default (args: Pick<Link, "href" | "type">) => {
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
