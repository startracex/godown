"use client";
import Progress from "godown/progress.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Progress);

export * from "godown/progress.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-progress": IntrinsicElement<Progress>;
    }
  }
}
