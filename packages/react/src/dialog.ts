"use client";
import Dialog from "godown/dialog.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Dialog);

export * from "godown/dialog.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-dialog": IntrinsicTag<"godown-dialog">;
    }
  }
}
