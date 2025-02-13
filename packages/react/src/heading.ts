"use client";
import Heading from "godown/heading.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Heading);

export * from "godown/heading.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-heading": IntrinsicTag<"godown-heading">;
    }
  }
}
