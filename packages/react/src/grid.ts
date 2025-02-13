"use client";
import Grid from "godown/grid.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Grid);

export * from "godown/grid.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-grid": IntrinsicTag<"godown-grid">;
    }
  }
}
