import Card from "./component.js";

Card.define();

export default Card;

declare global {
  interface HTMLElementTagNameMap {
    "godown-card": Card;
  }
}
