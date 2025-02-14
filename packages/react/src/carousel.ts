"use client";
import Carousel from "godown/carousel.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Carousel);

export * from "godown/carousel.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-carousel": IntrinsicElement<Carousel>;
    }
  }
}
