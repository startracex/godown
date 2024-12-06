"use client";
import component from "godown/split.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-split": IntrinsicTag<"godown-split">;
    }
  }
}
