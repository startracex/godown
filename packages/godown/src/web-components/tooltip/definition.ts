import { define } from "../../internal/call-define.js";
import Tooltip from "./component.js";

export default define(Tooltip) as typeof Tooltip;

declare global {
  interface HTMLElementTagNameMap {
    "godown-tooltip": Tooltip;
  }
}
