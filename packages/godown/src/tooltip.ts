import Tooltip from "./components/tooltip.js";

Tooltip.define();

export default Tooltip;

export * from "./components/tooltip.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-tooltip": Tooltip;
  }
}
