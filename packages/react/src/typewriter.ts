"use client";
import component from "godown/typewriter.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/typewriter.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-typewriter": IntrinsicTag<"godown-typewriter">;
    }
  }
}
