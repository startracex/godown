import { define } from "../../internal/call-define.js";
import Alert from "./component.js";

export default define(Alert) as typeof Alert;

declare global {
  interface HTMLElementTagNameMap {
    "godown-alert": Alert;
  }
}
