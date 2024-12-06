import Flex from "./components/flex.js";

Flex.define();

export default Flex;

export * from "./components/flex.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-flex": Flex;
  }
}
