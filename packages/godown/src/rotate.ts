import Rotate from "./components/rotate.js";

Rotate.define();

export default Rotate;

export * from "./components/rotate.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-rotate": Rotate;
  }
}
