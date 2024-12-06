import Divider from "./components/divider.js";

Divider.define();

export default Divider;

export * from "./components/divider.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-divider": Divider;
  }
}
