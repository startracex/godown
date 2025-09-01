import { define } from "../../internal/call-define.js";
import Select from "./component.js";

export default define(Select) as typeof Select;

declare global {
  interface HTMLElementTagNameMap {
    "godown-select": Select;
  }
}
