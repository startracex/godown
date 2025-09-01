import { define } from "../../internal/call-define.js";
import Flex from "./component.js";

export default define(Flex) as typeof Flex;

declare global {
  interface HTMLElementTagNameMap {
    "godown-flex": Flex;
  }
}
