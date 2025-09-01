import { define } from "../../internal/call-define.js";
import Switch from "./component.js";

export default define(Switch) as typeof Switch;

declare global {
  interface HTMLElementTagNameMap {
    "godown-switch": Switch;
  }
}
