"use client";
import component from "godown/grid.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/grid.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-grid": IntrinsicTag<"godown-grid">;
    }
  }
}
