import Heading from "./components/heading.js";

Heading.define();

export default Heading;

export * from "./components/heading.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-heading": Heading;
  }
}
