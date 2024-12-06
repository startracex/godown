"use client";
import component from "godown/progress.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/progress.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-progress": IntrinsicTag<"godown-progress">;
    }
  }
}
