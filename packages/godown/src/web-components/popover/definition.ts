import { define } from "../../internal/call-define.js";
import Popover from "./component.js";

export default define(Popover) as typeof Popover;

declare global {
  interface HTMLElementTagNameMap {
    "godown-popover": Popover;
  }
}
