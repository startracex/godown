import { attr } from "@godown/element";
import type { Badge } from "godown";
import { html } from "lit";

export default (args: Badge) => {
  return html`<godown-badge ${attr(args)}>
    ${args.position || "top-right"} ${args.dot ? "with dot" : ""}
  </godown-badge> `;
};

export const withAvatar = (args: Badge) => {
  return html`<godown-badge ${attr(args)}>
    <godown-avatar name="S" round stylex="background-color: darkgreen;"></godown-avatar>
  </godown-badge> `;
};
