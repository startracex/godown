"use client";
import Layout from "godown/layout.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Layout);

export * from "godown/layout.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-layout": IntrinsicTag<"godown-layout">;
    }
  }
}
