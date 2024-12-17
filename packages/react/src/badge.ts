"use client";
import component from "godown/badge.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/badge.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-badge": IntrinsicTag<"godown-badge">;
    }
  }
}
