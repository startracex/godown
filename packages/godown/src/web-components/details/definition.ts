import { define } from "../../internal/call-define.js";
import Details from "./component.js";

export default define(Details) as typeof Details;

declare global {
  interface HTMLElementTagNameMap {
    "godown-details": Details;
  }
}
