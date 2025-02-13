"use client";
import Range from "godown/range.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";
import Input from "godown/input.js";

export default createReact(
  Range,
  eventMap<{
    onChange: TargetedCustomEvent<string, Range>;
  }>({
    onChange: "change",
  }),
);

export * from "godown/range.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-range": IntrinsicTag<"godown-range">;
    }
  }
}
