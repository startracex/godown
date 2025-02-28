"use client";
import Details from "godown/details.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Details,
  eventMap<{
    onChange: TargetedCustomEvent<boolean, Details>;
  }>({
    onChange: "change",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-details": IntrinsicElement<Details>;
    }
  }
}
