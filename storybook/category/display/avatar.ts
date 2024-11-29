import "godown/avatar.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Avatar, "name" | "src" | "round">) => {
  return html`<godown-avatar ${attr(args)}>
</godown-avatar>
  `;
};
