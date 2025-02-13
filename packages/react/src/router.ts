"use client";
import Router from "godown/router.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Router);

export * from "godown/router.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-router": IntrinsicTag<"godown-router">;
    }
  }
}
