import Typewriter from "./components/typewriter.js";

Typewriter.define();

export default Typewriter;

export * from "./components/typewriter.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-typewriter": Typewriter;
  }
}
