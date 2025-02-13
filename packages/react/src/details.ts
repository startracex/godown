"use client";
import Details from "godown/details.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Details);

export * from "godown/details.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-details": IntrinsicTag<"godown-details">;
    }
  }
}
