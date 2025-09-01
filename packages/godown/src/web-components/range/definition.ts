import { define } from "../../internal/call-define.js";
import Range from "./component.js";

export default define(Range) as typeof Range;

declare global {
  interface HTMLElementTagNameMap {
    "godown-range": Range;
  }
}
