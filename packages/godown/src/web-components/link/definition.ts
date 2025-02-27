import Link from "./component.js";

Link.define();

export default Link;

declare global {
  interface HTMLElementTagNameMap {
    "godown-link": Link;
  }
}
