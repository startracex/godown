import { attr } from "@godown/element";
import type { Time } from "godown";
import { html } from "lit";

export default (args: Time) => {
  if (args.time) {
    args.time = new Date(args.time);
  }
  return html`
<godown-time ${attr(args)}></godown-time>
  `;
};
