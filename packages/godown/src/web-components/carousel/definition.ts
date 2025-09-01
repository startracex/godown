import { define } from "../../internal/call-define.js";
import Carousel from "./component.js";

export default define(Carousel) as typeof Carousel;

declare global {
  interface HTMLElementTagNameMap {
    "godown-carousel": Carousel;
  }
}
