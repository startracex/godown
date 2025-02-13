"use client";
import Time from "godown/time.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(
  Time,
  eventMap<{
    onTime: TargetedCustomEvent<Date, Time>;
  }>({
    onTime: "time",
  }),
);

export * from "godown/time.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-time": IntrinsicTag<"godown-time">;
    }
  }
}
