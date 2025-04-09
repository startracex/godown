import { attr } from "@godown/element";
import type { Dragbox } from "godown";
import { html } from "lit";

export default (args: Dragbox) => {
  return html`
<div style="position: relative;height: 12em;outline: 2px gray dashed;">
  <godown-dragbox ${attr(args)}>
    <div style="width: 4em; height: 4em; background: gray;"></div>
  </godown-dragbox>
</div>
  `;
};
