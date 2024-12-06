"use client";
import component from "godown/tooltip.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/tooltip.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-tooltip": IntrinsicTag<"godown-tooltip">;
    }
  }
}
