"use client";
import component from "godown/card.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/card.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-card": IntrinsicTag<"godown-card">;
    }
  }
}
