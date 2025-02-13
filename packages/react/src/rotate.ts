"use client";
import Rotate from "godown/rotate.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Rotate);

export * from "godown/rotate.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-rotate": IntrinsicTag<"godown-rotate">;
    }
  }
}
