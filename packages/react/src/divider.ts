"use client";
import component from "godown/divider.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/divider.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-divider": IntrinsicTag<"godown-divider">;
    }
  }
}
