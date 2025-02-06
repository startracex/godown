import { attr, omit } from "@godown/element";
import type { Tabs } from "godown";
import { html } from "lit";

export default (args: Pick<Tabs, "useSlot" | "tabs" | "index" | "outlineType">) => {
  return html`
    <godown-tabs
      ${attr(omit(args, "tabs"))}
      .tabs=${args.tabs}
    ></godown-tabs>
  `;
};
