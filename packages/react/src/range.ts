"use client";
import component from "godown/range.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-range": IntrinsicTag<"godown-range">;
    }
  }
}
