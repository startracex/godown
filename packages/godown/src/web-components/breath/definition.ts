import { define } from "../../internal/call-define.js";
import Breath from "./component.js";

export default define(Breath) as typeof Breath;

declare global {
  interface HTMLElementTagNameMap {
    "godown-breath": Breath;
  }
}
