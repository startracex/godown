"use client";
import Link from "godown/link.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Link);

export * from "godown/link.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-link": IntrinsicTag<"godown-link">;
    }
  }
}
