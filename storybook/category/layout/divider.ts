import { attr } from "@godown/element";
import type { Divider } from "godown";
import { html } from "lit";

export default (args: Divider) => {
  return html`
<godown-flex
  ?vertical="${!args.vertical}"
  content="space-evenly"
  items="center"
  style="height: 15em;"
>
  A
  <godown-divider ${attr(args)}></godown-divider>
  B
</godown-flex>
  `;
};
