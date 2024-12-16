"use client";
import component from "godown/button.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/button.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-button": IntrinsicTag<"godown-button">;
    }
  }
}
