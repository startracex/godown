import { attr } from "@godown/element";
import type { Divider } from "godown";
import { html } from "lit";

export default (args: Divider) => {
  return html`
    <div style="${
    args.vertical ? "" : "flex-direction: column;"
  }height: 300px;display: flex;justify-content: space-evenly;align-items: center;"
    >
  A
  <godown-divider ${attr(args)}></godown-divider>
  B
</div>
  `;
};
