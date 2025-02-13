"use client";
import Split from "godown/split.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Split);

export * from "godown/split.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-split": IntrinsicTag<"godown-split">;
    }
  }
}
