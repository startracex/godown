import { define } from "../../internal/call-define.js";
import Input from "./component.js";

export default define(Input) as typeof Input;

declare global {
  interface HTMLElementTagNameMap {
    "godown-input": Input;
  }
}
