"use client";
import Skeleton from "godown/skeleton.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Skeleton);

export * from "godown/skeleton.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-skeleton": IntrinsicTag<"godown-skeleton">;
    }
  }
}
