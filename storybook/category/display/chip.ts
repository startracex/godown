import { attr } from "@godown/element";
import type { Chip } from "godown";
import { html } from "lit";

export default (args: Chip) => {
  return html`<godown-chip ${attr(args)}>
    ${args.position || "top-right"} ${args.dot ? "with dot" : ""}
  </godown-chip> `;
};

export const withAvatar = (args: Chip) => {
  return html`<godown-chip ${attr(args)}>
    <godown-avatar name="S" round stylex="background-color: #12a1a1;"></godown-avatar>
  </godown-chip> `;
};
