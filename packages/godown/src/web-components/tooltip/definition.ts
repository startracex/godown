import Tooltip from "./component.js";

Tooltip.define();

export default Tooltip;

declare global {
  interface HTMLElementTagNameMap {
    "godown-tooltip": Tooltip;
  }
}
