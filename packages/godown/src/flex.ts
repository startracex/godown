import Flex from "./components/flex.js";

Flex.define();

export default Flex;

declare global {
  interface HTMLElementTagNameMap {
    "godown-flex": Flex;
  }
}
