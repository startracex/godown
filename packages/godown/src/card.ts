import Card from "./components/card.js";

Card.define();

export default Card;

declare global {
  interface HTMLElementTagNameMap {
    "godown-card": Card;
  }
}
