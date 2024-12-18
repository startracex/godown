"use client";
import component from "godown/heading.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/heading.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-heading": IntrinsicTag<"godown-heading">;
    }
  }
}
