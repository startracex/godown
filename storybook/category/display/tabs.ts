import { attr } from "@godown/element";
import type { Tabs } from "godown";
import { html } from "lit";

export default (args: Tabs) => {
  return html`
<godown-tabs ${attr(args)}>
${
    args.tabs.map(
      (tab) =>
        html`
  <div
    slot="${tab}"
    style="padding: 0 .5em;white-space: nowrap;"
  >
    Slot ${tab}
  </div>`,
    )
  }

</godown-tabs>
  `;
};
