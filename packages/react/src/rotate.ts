"use client";
import component from "godown/rotate.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/rotate.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-rotate": IntrinsicTag<"godown-rotate">;
    }
  }
}
