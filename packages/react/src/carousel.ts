"use client";
import component from "godown/carousel.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/carousel.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-carousel": IntrinsicTag<"godown-carousel">;
    }
  }
}
