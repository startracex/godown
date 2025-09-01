import { define } from "../../internal/call-define.js";
import Card from "./component.js";

export default define(Card) as typeof Card;

declare global {
  interface HTMLElementTagNameMap {
    "godown-card": Card;
  }
}
