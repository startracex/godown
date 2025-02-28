"use client";
import Range from "godown/range.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Range,
  eventMap<{
    onChange: TargetedCustomEvent<string, Range>;
  }>({
    onChange: "change",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-range": IntrinsicElement<Range>;
    }
  }
}
