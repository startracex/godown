import "godown/typewriter.js";

import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Typewriter, "text" | "delay">) => {
  return html`<godown-typewriter .text=${args.text}></godown-typewriter>`;
};
