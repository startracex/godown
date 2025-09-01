import { define } from "../../internal/call-define.js";
import Link from "./component.js";

export default define(Link) as typeof Link;

declare global {
  interface HTMLElementTagNameMap {
    "godown-link": Link;
  }
}
