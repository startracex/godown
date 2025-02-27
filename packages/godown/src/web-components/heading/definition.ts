import Heading from "./component.js";

Heading.define();

export default Heading;

declare global {
  interface HTMLElementTagNameMap {
    "godown-heading": Heading;
  }
}
