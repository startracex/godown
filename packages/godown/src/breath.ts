import Breath from "./components/breath.js";

Breath.define();

export default Breath;

export * from "./components/breath.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-breath": Breath;
  }
}
