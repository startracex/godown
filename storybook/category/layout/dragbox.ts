import { attr } from "@godown/element";
import type { Dragbox } from "godown";
import { html } from "lit";

export default (args: Dragbox) => {
  return html`
<div style="position: relative;height: 200px;outline: 2px gray dashed;">
  <godown-dragbox ${attr(args)}>
    <div style="width: 50px; height: 50px; background: gray;"></div>
  </godown-dragbox>
</div>
  `;
};
