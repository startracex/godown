import Rotate from "./component.js";

Rotate.define();

export default Rotate;

declare global {
  interface HTMLElementTagNameMap {
    "godown-rotate": Rotate;
  }
}
