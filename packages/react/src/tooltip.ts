"use client";
import component from "godown/tooltip.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-tooltip": IntrinsicTag<"godown-tooltip">;
    }
  }
}
