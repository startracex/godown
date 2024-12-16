import "godown/divider.js";

import { attr } from "@godown/element/directives/attr";
import { html, nothing } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Divider, "vertical">) => {
  return html`<godown-divider ${attr(args)} style="${args.vertical ? "height: 200px;" : nothing}"></godown-divider>`;
};
