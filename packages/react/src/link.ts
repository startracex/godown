"use client";
import component from "godown/link.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/link.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-link": IntrinsicTag<"godown-link">;
    }
  }
}
