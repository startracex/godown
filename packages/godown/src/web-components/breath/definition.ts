import Breath from "./component.js";

Breath.define();

export default Breath;

declare global {
  interface HTMLElementTagNameMap {
    "godown-breath": Breath;
  }
}
