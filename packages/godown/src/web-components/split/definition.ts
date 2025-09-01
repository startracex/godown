import { define } from "../../internal/call-define.js";
import Split from "./component.js";

export default define(Split) as typeof Split;

declare global {
  interface HTMLElementTagNameMap {
    "godown-split": Split;
  }
}
