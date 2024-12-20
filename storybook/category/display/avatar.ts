import { attr } from "@godown/element/directives/attr.js";
import type { Avatar } from "godown";
import { html } from "lit";

export default (args: Pick<Avatar, "name" | "src" | "round">) => {
  return html`<godown-avatar ${attr(args)}>
</godown-avatar>
  `;
};
