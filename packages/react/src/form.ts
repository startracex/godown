"use client";
import component from "godown/form.js";

import create from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/form.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-form": IntrinsicTag<"godown-form">;
    }
  }
}
