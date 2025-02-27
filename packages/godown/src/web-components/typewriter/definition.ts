import Typewriter from "./component.js";

Typewriter.define();

export default Typewriter;

declare global {
  interface HTMLElementTagNameMap {
    "godown-typewriter": Typewriter;
  }
}
