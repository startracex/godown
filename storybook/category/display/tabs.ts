import { attr } from "@godown/element";
import type { Tabs } from "godown";
import { html } from "lit";

export default (args: Pick<Tabs, "useSlot" | "tabs" | "index" | "outlineType">) => {
  return html`
    <godown-tabs ${attr(args)}></godown-tabs>
  `;
};
