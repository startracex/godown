import { define } from "../../internal/call-define.js";
import Time from "./component.js";

export default define(Time) as typeof Time;

declare global {
  interface HTMLElementTagNameMap {
    "godown-time": Time;
  }
}
