import Divider from "./components/divider.js";

Divider.define();

export default Divider;

declare global {
  interface HTMLElementTagNameMap {
    "godown-divider": Divider;
  }
}
