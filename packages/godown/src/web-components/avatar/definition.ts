import { define } from "../../internal/call-define.js";
import Avatar from "./component.js";

export default define(Avatar) as typeof Avatar;

declare global {
  interface HTMLElementTagNameMap {
    "godown-avatar": Avatar;
  }
}
