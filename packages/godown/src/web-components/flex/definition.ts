import Flex from "./component.js";

Flex.define();

export default Flex;

declare global {
  interface HTMLElementTagNameMap {
    "godown-flex": Flex;
  }
}
