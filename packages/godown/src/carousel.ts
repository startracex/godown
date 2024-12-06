import Carousel from "./components/carousel.js";

Carousel.define();

export default Carousel;

export * from "./components/carousel.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-carousel": Carousel;
  }
}
