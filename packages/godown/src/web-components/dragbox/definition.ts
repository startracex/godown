import { define } from "../../internal/call-define.js";
import Dragbox from "./component.js";

export default define(Dragbox) as typeof Dragbox;

declare global {
  interface HTMLElementTagNameMap {
    "godown-dragbox": Dragbox;
  }
}
