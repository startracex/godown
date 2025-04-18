import Popover from "./component.js";

Popover.define();

export default Popover;

declare global {
  interface HTMLElementTagNameMap {
    "godown-popover": Popover;
  }
}
