import { define } from "../../internal/call-define.js";
import Form from "./component.js";

export default define(Form) as typeof Form;

declare global {
  interface HTMLElementTagNameMap {
    "godown-form": Form;
  }
}
