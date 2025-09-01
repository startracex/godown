import { define } from "../../internal/call-define.js";
import Router from "./component.js";

export default define(Router) as typeof Router;

declare global {
  interface HTMLElementTagNameMap {
    "godown-router": Router;
  }
}
