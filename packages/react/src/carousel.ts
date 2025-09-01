"use client";
import Carousel from "godown/carousel.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Carousel,
  eventMap<{
    onChange: TargetedCustomEvent<number, InstanceType<typeof Carousel>>;
  }>({
    onChange: "change",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-carousel": IntrinsicElement<InstanceType<typeof Carousel>>;
    }
  }
}
