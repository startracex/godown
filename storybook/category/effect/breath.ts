import "godown/breath.js";

import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Breath, "text" | "duration">) => {
  return html`<godown-breath .duration=${args.duration} .text=${args.text}></godown-breath>`;
};
