import { define } from "../../internal/call-define.js";
import Progress from "./component.js";

export default define(Progress) as typeof Progress;

declare global {
  interface HTMLElementTagNameMap {
    "godown-progress": Progress;
  }
}
