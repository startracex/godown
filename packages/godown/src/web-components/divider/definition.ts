import Divider from "./component.js";

Divider.define();

export default Divider;

declare global {
  interface HTMLElementTagNameMap {
    "godown-divider": Divider;
  }
}
