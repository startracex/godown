import { define } from "../../internal/call-define.js";
import Typewriter from "./component.js";

export default define(Typewriter) as typeof Typewriter;

declare global {
  interface HTMLElementTagNameMap {
    "godown-typewriter": Typewriter;
  }
}
