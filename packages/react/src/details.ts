"use client";
import Details from "godown/details.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(
  Details,
  eventMap<{
    onChange: TargetedCustomEvent<boolean, Details>;
  }>({
    onChange: "change",
  }),
);

export * from "godown/details.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-details": IntrinsicTag<"godown-details">;
    }
  }
}
