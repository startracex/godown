import { define } from "../../internal/call-define.js";
import Chip from "./component.js";

export default define(Chip) as typeof Chip;

declare global {
  interface HTMLElementTagNameMap {
    "godown-chip": Chip;
  }
}
