import { define } from "../../internal/call-define.js";
import Badge from "./component.js";

export default define(Badge) as typeof Badge;

declare global {
  interface HTMLElementTagNameMap {
    "godown-badge": Badge;
  }
}
