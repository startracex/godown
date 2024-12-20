import { attr } from "@godown/element/directives/attr.js";
import type { Badge } from "godown";
import { html } from "lit";

export default (args: Pick<Badge, "position" | "dot" | "value" | "max">) => {
  return html`<godown-badge ${attr(args)}>
    ${args.position || "top-right"} ${args.dot ? "with dot" : ""}
  </godown-badge> `;
};

export const withAvatar = (args: Pick<Badge, "position" | "dot" | "value" | "max">) => {
  return html`<godown-badge ${attr(args)}>
    <godown-avatar name="S" round stylex="background-color: darkgreen;"></godown-avatar>
  </godown-badge> `;
};
