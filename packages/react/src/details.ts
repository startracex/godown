"use client";
import component from "godown/details.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/details.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-details": IntrinsicTag<"godown-details">;
    }
  }
}
