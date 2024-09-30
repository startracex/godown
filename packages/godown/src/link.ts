import Link from "./components/link.js";

Link.define();

export default Link;

export * from "./components/link.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-link": Link;
  }
}
