import { attr } from "@godown/element";
import type { Tabs } from "godown";
import { html } from "lit";

export default (args: Tabs) => {
  return html`
    <godown-tabs ${attr(args)}></godown-tabs>
  `;
};
