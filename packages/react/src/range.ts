"use client";
import component from "godown/range.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/range.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-range": IntrinsicTag<"godown-range">;
    }
  }
}
