import { define } from "../../internal/call-define.js";
import Text from "./component.js";

export default define(Text) as typeof Text;

declare global {
  interface HTMLElementTagNameMap {
    "godown-text": Text;
  }
}
