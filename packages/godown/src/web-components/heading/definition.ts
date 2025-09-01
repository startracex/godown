import { define } from "../../internal/call-define.js";
import Heading from "./component.js";

export default define(Heading) as typeof Heading;

declare global {
  interface HTMLElementTagNameMap {
    "godown-heading": Heading;
  }
}
