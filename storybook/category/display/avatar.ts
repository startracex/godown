import "godown/avatar.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Avatar, "name" | "src" | "round">) => {
  return html`<godown-avatar ${attr(args)} style="background-color: #007cc7;">
</godown-avatar>
  `;
};
