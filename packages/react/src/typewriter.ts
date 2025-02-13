"use client";
import Typewriter from "godown/typewriter.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Typewriter);

export * from "godown/typewriter.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-typewriter": IntrinsicTag<"godown-typewriter">;
    }
  }
}
