"use client";
import component from "godown/layout.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/layout.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-layout": IntrinsicTag<"godown-layout">;
    }
  }
}
