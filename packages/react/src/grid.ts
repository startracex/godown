"use client";
import Grid from "godown/grid.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Grid);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-grid": IntrinsicElement<Grid>;
    }
  }
}
