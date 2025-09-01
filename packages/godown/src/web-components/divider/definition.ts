import { define } from "../../internal/call-define.js";
import Divider from "./component.js";

export default define(Divider) as typeof Divider;

declare global {
  interface HTMLElementTagNameMap {
    "godown-divider": Divider;
  }
}
