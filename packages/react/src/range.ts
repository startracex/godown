"use client";
import Range from "godown/range.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Range);

export * from "godown/range.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-range": IntrinsicTag<"godown-range">;
    }
  }
}
