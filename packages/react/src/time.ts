"use client";
import Time from "godown/time.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Time,
  eventMap<{
    onTime: TargetedCustomEvent<Date, InstanceType<typeof Time>>;
  }>({
    onTime: "time",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-time": IntrinsicElement<InstanceType<typeof Time>>;
    }
  }
}
