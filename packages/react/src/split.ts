"use client";
import component from "godown/split.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/split.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-split": IntrinsicTag<"godown-split">;
    }
  }
}
