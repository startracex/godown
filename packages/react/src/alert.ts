"use client";
import Alert from "godown/alert.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Alert);

export * from "godown/alert.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-alert": IntrinsicTag<"godown-alert">;
    }
  }
}
