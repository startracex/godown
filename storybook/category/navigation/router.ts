import { attr } from "@godown/element";
import type { Router } from "godown";
import { html } from "lit";

export default (args: Router) => {
  return html`
<godown-flex vertical gap=".5em">
  Current pathname: ${args.pathname}
  <godown-link href="/" style="text-decoration: underline">
    Page1
  </godown-link>
  <godown-link href="/x" style="text-decoration: underline">
    Page 2
  </godown-link>
  <godown-link href="/x/x" style="text-decoration: underline">
    Page 3
  </godown-link>
  <godown-router ${attr(args)}>
    <div slot="/">Strict match ( / => / )</div>
    <div slot="/:dynamic">Dynamic match ( ${args.pathname} => /:dynamic )</div>
    <div slot="/*wild_dynamic">Wild dynamic match ( ${args.pathname} => /*wild_dynamic )</div>
    <div>No slotted</div>
  </godown-router>
</godown-flex>
  `;
};
