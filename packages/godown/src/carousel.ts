import Carousel from "./components/carousel.js";

Carousel.define();

export default Carousel;

declare global {
  interface HTMLElementTagNameMap {
    "godown-carousel": Carousel;
  }
}
