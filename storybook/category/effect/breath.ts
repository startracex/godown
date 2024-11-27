import "godown/breath.js";

import { attr } from "@godown/element/directives/attr";
import { omit } from "@godown/element/tools/lib";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Breath, "text" | "duration">) => {
  return html`<godown-breath ${attr(omit(args, "text"))} .text=${args.text}></godown-breath>`;
};
