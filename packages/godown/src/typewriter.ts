import Typewriter from "./components/typewriter.js";

Typewriter.define();

export default Typewriter;

declare global {
  interface HTMLElementTagNameMap {
    "godown-typewriter": Typewriter;
  }
}
