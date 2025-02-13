"use client";
import Select from "godown/select.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Select);

export * from "godown/select.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-select": IntrinsicTag<"godown-select">;
    }
  }
}
