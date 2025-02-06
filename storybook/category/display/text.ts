import { attr } from "@godown/element";
import type { Text } from "godown";
import { html } from "lit";

export default (args: Pick<Text, "underline" | "clip">) => {
  return html`
<godown-text ${attr(args)}>
  <div> Reason has always existed, but not always in a reasonable form. 
    <!-- From a certain communist -->
  </div>
</godown-text>
  `;
};
