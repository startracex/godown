import "godown/badge";
import "godown/avatar";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import type { Godown } from "../../types";

export default (args: Pick<Godown.Badge, "position" | "dot" | "value" | "max">) => {
  return html`<godown-badge ${attr(args)}>
    ${args.position || "top-right"} ${args.dot ? "with dot" : ""}
  </godown-badge> `;
};

export const withAvatar = (args: Pick<Godown.Badge, "position" | "dot" | "value" | "max">) => {
  return html`<godown-badge ${attr(args)}>
    <godown-avatar name="S" round stylex="background-color: darkgreen;"></godown-avatar>
  </godown-badge> `;
};
