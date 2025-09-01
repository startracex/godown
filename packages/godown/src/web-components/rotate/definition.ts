import { define } from "../../internal/call-define.js";
import Rotate from "./component.js";

export default define(Rotate) as typeof Rotate;

declare global {
  interface HTMLElementTagNameMap {
    "godown-rotate": Rotate;
  }
}
