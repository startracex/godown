import Chip from "./component.js";

Chip.define();

export default Chip;

declare global {
  interface HTMLElementTagNameMap {
    "godown-chip": Chip;
  }
}
