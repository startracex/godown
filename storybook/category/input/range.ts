import { attr } from "@godown/element";
import type { Range } from "godown";
import { html } from "lit";

export default (args: Range) => {
  return html`
<div style="height: 200px;display: flex;justify-content: center;">
  <godown-range ${attr(args)}></godown-range>
</div>
  `;
};
