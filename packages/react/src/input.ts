"use client";
import Input from "godown/input.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Input);

export * from "godown/input.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-input": IntrinsicTag<"godown-input">;
    }
  }
}
