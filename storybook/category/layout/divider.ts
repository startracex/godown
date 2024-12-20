import { attr } from "@godown/element/directives/attr.js";
import type { Divider } from "godown";
import { html, nothing } from "lit";

export default (args: Pick<Divider, "vertical">) => {
  return html`<godown-divider ${attr(args)} style="${args.vertical ? "height: 200px;" : nothing}"></godown-divider>`;
};
