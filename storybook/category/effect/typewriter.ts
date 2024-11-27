import "godown/typewriter.js";

import { attr } from "@godown/element/directives";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Typewriter, "text" | "delay">) => {
  return html`<godown-typewriter ${attr(args)}></godown-typewriter>`;
};
