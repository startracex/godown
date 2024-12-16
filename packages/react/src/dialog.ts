"use client";
import component from "godown/dialog.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/dialog.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-dialog": IntrinsicTag<"godown-dialog">;
    }
  }
}
