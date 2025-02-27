import Carousel from "./component.js";

Carousel.define();

export default Carousel;

declare global {
  interface HTMLElementTagNameMap {
    "godown-carousel": Carousel;
  }
}
