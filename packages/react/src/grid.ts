"use client";
import component from "godown/grid.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-grid": IntrinsicTag<"godown-grid">;
    }
  }
}
