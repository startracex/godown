"use client";
import Time from "godown/time.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Time);

export * from "godown/time.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-time": IntrinsicTag<"godown-time">;
    }
  }
}
