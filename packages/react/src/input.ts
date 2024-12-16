"use client";
import component from "godown/input.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/input.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-input": IntrinsicTag<"godown-input">;
    }
  }
}
