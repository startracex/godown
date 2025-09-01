import { define } from "../../internal/call-define.js";
import Button from "./component.js";

export default define(Button) as typeof Button;

declare global {
  interface HTMLElementTagNameMap {
    "godown-button": Button;
  }
}
