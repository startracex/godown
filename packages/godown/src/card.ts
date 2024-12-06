import Card from "./components/card.js";

Card.define();

export default Card;

export * from "./components/card.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-card": Card;
  }
}
