import { attr } from "@godown/element/directives/attr.js";
import { omit } from "@godown/element/tools/lib.js";
import type { Breath } from "godown";
import { html } from "lit";

export default (args: Pick<Breath, "content" | "duration">) => {
  return html`<godown-breath ${attr(omit(args, "text"))} .text=${args.text}></godown-breath>`;
};
