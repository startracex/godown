import { attr } from "@godown/element";
import type { Avatar } from "godown";
import { html } from "lit";

export default (args: Pick<Avatar, "name" | "src" | "round">) => {
  return html`<godown-avatar ${attr(args)}>
</godown-avatar>
  `;
};
