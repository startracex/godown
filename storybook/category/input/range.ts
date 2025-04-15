import { attr } from "@godown/element";
import type { Range } from "godown";
import { html } from "lit";

export default (args: Range) => {
  return html`
<godown-flex content=center items=center style="height: ${args.vertical? "100%" : "auto"};">
  <godown-range ${attr(args)}></godown-range>
</godown-flex>
  `;
};
