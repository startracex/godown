"use client";
import component from "godown/skeleton.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/skeleton.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-skeleton": IntrinsicTag<"godown-skeleton">;
    }
  }
}
