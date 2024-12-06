"use client";
import component from "godown/progress.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-progress": IntrinsicTag<"godown-progress">;
    }
  }
}
