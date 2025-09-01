import { define } from "../../internal/call-define.js";
import Dialog from "./component.js";

export default define(Dialog) as typeof Dialog;

declare global {
  interface HTMLElementTagNameMap {
    "godown-dialog": Dialog;
  }
}
