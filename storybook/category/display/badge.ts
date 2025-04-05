import { attr } from "@godown/element";
import type { Badge } from "godown";
import { html } from "lit";

export default (args: Badge) => {
  return html`
    <godown-badge ${attr(args)}>Badge</godown-badge>
  `;
};
